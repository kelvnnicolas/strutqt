import * as authService from '../services/authService';
import { serialize } from 'cookie';
import { AppError, ErrorCodes, handleError, sendError, sendSuccess } from '../utils/errorHandler';
import { loginSchema, parseInput, signupSchema } from '../validators/auth';

const REFRESH_COOKIE = 'refreshToken';

function setRefreshTokenCookie(res, token) {
  res.setHeader('Set-Cookie', serialize(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  }));
}

function clearRefreshTokenCookie(res) {
  res.setHeader('Set-Cookie', serialize(REFRESH_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  }));
}

function invalidInput(res, issues) {
  return sendError(res, ErrorCodes.VALIDATION_ERROR, undefined, { issues });
}

export async function signup(req, res) {
  try {
    const { data, issues } = parseInput(signupSchema, req.body);
    if (issues) return invalidInput(res, issues);

    await authService.createUser(data.email, data.password, data.name);
    // Auto-login after signup
    const tokens = await authService.loginUser(data.email, data.password);
    setRefreshTokenCookie(res, tokens.refreshToken);
    return sendSuccess(res, { user: tokens.user, accessToken: tokens.accessToken }, 201);
  } catch (error) {
    return handleError(res, error, 'signup');
  }
}

export async function login(req, res) {
  try {
    const { data, issues } = parseInput(loginSchema, req.body);
    if (issues) return invalidInput(res, issues);

    const tokens = await authService.loginUser(data.email, data.password);
    setRefreshTokenCookie(res, tokens.refreshToken);
    return sendSuccess(res, { user: tokens.user, accessToken: tokens.accessToken });
  } catch (error) {
    return handleError(res, error, 'login');
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) return sendError(res, ErrorCodes.AUTH_UNAUTHORIZED);

    const tokens = await authService.refreshSession(token);
    setRefreshTokenCookie(res, tokens.refreshToken);
    return sendSuccess(res, { accessToken: tokens.accessToken });
  } catch (error) {
    clearRefreshTokenCookie(res);
    // Token invalido, expirado ou revogado: sempre a mesma resposta ao cliente.
    if (error instanceof AppError) return sendError(res, error.errorDef);
    if (error?.name === 'JsonWebTokenError' || error?.name === 'TokenExpiredError') {
      return sendError(res, ErrorCodes.AUTH_TOKEN_EXPIRED);
    }
    return handleError(res, error, 'refresh');
  }
}

export async function logout(req, res) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (token) await authService.logoutUser(token);
    clearRefreshTokenCookie(res);
    return sendSuccess(res, {});
  } catch (error) {
    return handleError(res, error, 'logout');
  }
}

export async function me(req, res) {
  // User context is attached by withAuth before this handler runs.
  if (!req.user) return sendError(res, ErrorCodes.AUTH_UNAUTHORIZED);
  try {
    const user = await authService.getUserById(req.user.userId);
    if (!user) return sendError(res, ErrorCodes.NOT_FOUND, 'User not found');
    return sendSuccess(res, { user });
  } catch (error) {
    return handleError(res, error, 'me');
  }
}
