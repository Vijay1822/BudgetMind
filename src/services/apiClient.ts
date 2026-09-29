import { getCurrentIdToken } from './firebase';

export interface ApiClientOptions extends RequestInit {
  skipAuth?: boolean;
}

class ApiClient {
  private fallbackToken: string | null = null;

  constructor() {
    this.fallbackToken = typeof window !== 'undefined' ? localStorage.getItem('budgetmind_token') : null;
  }

  public setFallbackToken(token: string | null) {
    this.fallbackToken = token;
    if (token) {
      localStorage.setItem('budgetmind_token', token);
    } else {
      localStorage.removeItem('budgetmind_token');
    }
  }

  /**
   * Resolves the current authentication token:
   * 1. Fresh Firebase ID token from Firebase currentUser
   * 2. Fallback session token from active session state/storage
   */
  public async getAuthToken(forceRefresh = false): Promise<string | null> {
    const firebaseToken = await getCurrentIdToken(forceRefresh);
    if (firebaseToken) {
      return firebaseToken;
    }
    return this.fallbackToken || (typeof window !== 'undefined' ? localStorage.getItem('budgetmind_token') : null);
  }

  /**
   * Executes an authenticated HTTP request
   */
  public async request<T = any>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    const { skipAuth, headers = {}, ...rest } = options;

    const reqHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((headers as Record<string, string>) || {}),
    };

    if (!skipAuth) {
      const token = await this.getAuthToken();
      if (token) {
        reqHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const url = endpoint.startsWith('http') || !baseUrl
      ? endpoint
      : `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    let response = await fetch(url, {
      headers: reqHeaders,
      ...rest,
    });

    // If 401 Unauthorized, attempt single token refresh with Firebase
    if (response.status === 401 && !skipAuth) {
      console.warn('[ApiClient] 401 Unauthorized received, attempting token refresh...');
      const freshToken = await this.getAuthToken(true);
      if (freshToken) {
        reqHeaders['Authorization'] = `Bearer ${freshToken}`;
        response = await fetch(url, {
          headers: reqHeaders,
          ...rest,
        });
      }

      if (response.status === 401) {
        // Broadcast auth expired event if still unauthorized
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('budgetmind:auth-expired'));
        }
      }
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage = errorBody.error || errorBody.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).data = errorBody;
      throw error;
    }

    return response.json();
  }

  public get<T = any>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  public post<T = any>(endpoint: string, body?: any, options: ApiClientOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  public put<T = any>(endpoint: string, body?: any, options: ApiClientOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  public delete<T = any>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }

  /**
   * Transparent fetch wrapper that attaches Authorization: Bearer token
   */
  public async fetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
    const headers = new Headers(init.headers || {});
    if (!headers.has('Authorization')) {
      const token = await this.getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return fetch(input, { ...init, headers });
  }
}

export const apiClient = new ApiClient();
export const apiFetch = (input: RequestInfo | URL, init: RequestInit = {}) => apiClient.fetch(input, init);
