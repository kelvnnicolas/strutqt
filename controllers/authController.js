import * as authService from '../services/authService';
import { serialize } from 'cookie';

// Helper to set cookie safely
function setRefreshTokenCookie(res, token) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Uses secure cookies if production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  };
  res.setHeader('Set-Cookie', serialize('refreshToken', token, cookieOptions));
}

function clearRefreshTokenCookie(res) {
  res.setHeader('Set-Cookie', serialize('refreshToken', '', { maxAge: -1, path: '/' }));
}

export async function signup(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await authService.createUser(email, password, name);
    // Auto-login after signup
    const tokens = await authService.loginUser(email, password);
    setRefreshTokenCookie(res, tokens.refreshToken);
    return res.status(201).json({ user: tokens.user, accessToken: tokens.accessToken });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const tokens = await authService.loginUser(email, password);
    setRefreshTokenCookie(res, tokens.refreshToken);
    return res.json({ user: tokens.user, accessToken: tokens.accessToken });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token provided' });
    
    const tokens = await authService.refreshSession(token);
    setRefreshTokenCookie(res, tokens.refreshToken);
    return res.json({ accessToken: tokens.accessToken });
  } catch (error) {
    clearRefreshTokenCookie(res);
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
}

export async function logout(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (token) await authService.logoutUser(token);
    clearRefreshTokenCookie(res);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function me(req, res) {
   // User context should be attached by the authMiddleware before calling this
   if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
   try {
     const user = await authService.getUserById(req.user.userId);
     if (!user) return res.status(404).json({ error: 'User not found' });
     return res.json({ user });
   } catch(e) {
     return res.status(500).json({ error: e.message });
   }
}
