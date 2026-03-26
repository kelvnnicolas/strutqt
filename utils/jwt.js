import jwt from 'jsonwebtoken';

// Fallback secrets for development. Stronger keys must be used in production.
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'super_secret_access_key_123';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_456';

export function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email }, 
    ACCESS_TOKEN_SECRET, 
    { expiresIn: '15m' } // 15 minutes as requested
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email }, 
    REFRESH_TOKEN_SECRET, 
    { expiresIn: '7d' } // 7 days as requested
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}
