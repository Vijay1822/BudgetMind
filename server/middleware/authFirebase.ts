import { Request, Response, NextFunction } from 'express';
import { verifyFirebaseIdToken, VerifiedFirebaseUser } from '../services/firebaseAdmin';

// Extend Express Request type with verified identity
declare global {
  namespace Express {
    interface Request {
      user?: VerifiedFirebaseUser;
    }
  }
}

/**
 * Middleware: requireAuth / authenticateFirebaseToken
 * Enforces verified token authentication on protected endpoints.
 * Returns 401 for missing/invalid/expired tokens.
 * Derives user identity strictly from the verified token.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or malformed Authorization header with Bearer token.',
    });
  }

  const token = authHeader.split('Bearer ')[1]?.trim();
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Bearer token is empty.',
    });
  }

  try {
    const verifiedUser = await verifyFirebaseIdToken(token);
    req.user = verifiedUser;
    next();
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      error: `Unauthorized: ${err.message || 'Invalid or expired token.'}`,
    });
  }
}

export const authenticateFirebaseToken = requireAuth;
