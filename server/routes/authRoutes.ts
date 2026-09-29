import { Router } from 'express';
import { dbRepository } from '../data/dbRepository';
import { verifyFirebaseIdToken } from '../services/firebaseAdmin';

const router = Router();

// In-memory sessions store
export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  role: string;
  organization: string;
  avatar_url?: string;
  created_at: string;
}

const usersByEmail: Record<string, UserSession> = {
  'alex.rivera@enterprise.com': {
    id: 'usr-0001-admin',
    email: 'alex.rivera@enterprise.com',
    full_name: 'Alex Rivera',
    role: 'Finance & Procurement Director',
    organization: 'Apex Global Enterprises',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    created_at: new Date().toISOString(),
  },
};

const sessions: Record<string, UserSession> = {
  'session-default': usersByEmail['alex.rivera@enterprise.com'],
};

// POST /api/auth/google - Authenticate with Firebase Google ID Token
router.post('/google', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const bodyToken = req.body?.idToken;
    const token = (authHeader && authHeader.startsWith('Bearer '))
      ? authHeader.split('Bearer ')[1].trim()
      : bodyToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Missing Firebase ID token in Authorization header or body.',
      });
    }

    // Verify token using Firebase Admin SDK (derive identity strictly from token)
    const verified = await verifyFirebaseIdToken(token);
    const lowerEmail = verified.email.toLowerCase();

    // Link/upsert user record in Supabase & relational data store
    const user = await dbRepository.upsertUser({
      firebase_uid: verified.uid,
      email: verified.email,
      full_name: verified.name,
      avatar_url: verified.picture,
    });
    usersByEmail[lowerEmail] = user;

    const sessionToken = `bm-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessions[sessionToken] = user;

    res.json({
      success: true,
      data: {
        token: sessionToken,
        user,
        provider: 'FIREBASE_GOOGLE_AUTH',
      },
    });
  } catch (err: any) {
    console.error('[Auth] Google token verification error:', err.message);
    res.status(401).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const lowerEmail = email.toLowerCase();
    const token = `bm-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const user: UserSession = usersByEmail[lowerEmail] || {
      id: `usr-${Date.now()}`,
      email,
      full_name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      role: 'Finance & Procurement Lead',
      organization: 'Apex Global Enterprises',
      created_at: new Date().toISOString(),
    };

    usersByEmail[lowerEmail] = user;
    sessions[token] = user;

    res.json({
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { full_name, email, password, organization, role } = req.body;
    if (!email || !password || !full_name) {
      return res.status(400).json({ success: false, error: 'Full name, email and password are required' });
    }

    const token = `bm-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const user: UserSession = {
      id: `usr-${Date.now()}`,
      email,
      full_name,
      role: role || 'Finance Lead',
      organization: organization || 'Enterprise SaaS Corp',
      created_at: new Date().toISOString(),
    };

    usersByEmail[email.toLowerCase()] = user;
    sessions[token] = user;

    res.json({
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
  }

  if (sessions[token]) {
    return res.json({ success: true, data: sessions[token] });
  }

  try {
    const verified = await verifyFirebaseIdToken(token);
    const user = await dbRepository.upsertUser({
      firebase_uid: verified.uid,
      email: verified.email,
      full_name: verified.name,
      avatar_url: verified.picture,
    });
    return res.json({ success: true, data: user });
  } catch {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired token' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '').trim();
  if (token && sessions[token]) {
    delete sessions[token];
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
