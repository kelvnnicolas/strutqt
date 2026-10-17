import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockRes } from './helpers';

vi.mock('../services/authService', () => ({
  createUser: vi.fn(),
  loginUser: vi.fn(),
  refreshSession: vi.fn(),
  logoutUser: vi.fn(),
  getUserById: vi.fn(),
}));

const authService = await import('../services/authService');
const { login, logout, refresh, signup } = await import('../controllers/authController');
const { AppError, ErrorCodes } = await import('../utils/errorHandler');

const session = {
  user: { id: 'u1', email: 'a@b.co', name: null, avatar: null },
  accessToken: 'access',
  refreshToken: 'refresh',
};

beforeEach(() => vi.resetAllMocks());

describe('signup', () => {
  it('recusa corpo invalido com 400 e sem tocar no service', async () => {
    const res = mockRes();
    await signup({ body: { email: 'x' } }, res);
    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(res.body.issues.map((i) => i.field)).toEqual(expect.arrayContaining(['email', 'password']));
    expect(authService.createUser).not.toHaveBeenCalled();
  });

  it('cria a conta, abre a sessao e grava o cookie httpOnly', async () => {
    authService.createUser.mockResolvedValue(session.user);
    authService.loginUser.mockResolvedValue(session);
    const res = mockRes();
    await signup({ body: { email: 'A@B.co', password: 'senha-forte-1', name: 'Ana' } }, res);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true, user: session.user, accessToken: 'access' });
    expect(authService.createUser).toHaveBeenCalledWith('a@b.co', 'senha-forte-1', 'Ana');
    expect(res.headers['Set-Cookie']).toMatch(/refreshToken=refresh.*HttpOnly.*SameSite=Strict/i);
  });

  it('e-mail ja cadastrado devolve 409 com codigo', async () => {
    authService.createUser.mockRejectedValue(new AppError(ErrorCodes.AUTH_USER_EXISTS));
    const res = mockRes();
    await signup({ body: { email: 'a@b.co', password: 'senha-forte-1' } }, res);
    expect(res.statusCode).toBe(409);
    expect(res.body.code).toBe('AUTH_USER_EXISTS');
  });

  it('erro inesperado vira 500 generico, sem vazar a mensagem nem a senha', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    authService.createUser.mockRejectedValue(new Error('connect ECONNREFUSED 10.0.0.1:5432'));
    const res = mockRes();
    await signup({ body: { email: 'a@b.co', password: 'senha-forte-1' } }, res);
    expect(res.statusCode).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('ECONNREFUSED');
    expect(JSON.stringify(spy.mock.calls)).not.toContain('senha-forte-1');
    spy.mockRestore();
  });
});

describe('login', () => {
  it('credenciais erradas: 401 AUTH_INVALID_CREDENTIALS', async () => {
    authService.loginUser.mockRejectedValue(new AppError(ErrorCodes.AUTH_INVALID_CREDENTIALS));
    const res = mockRes();
    await login({ body: { email: 'a@b.co', password: 'errada' } }, res);
    expect(res.statusCode).toBe(401);
    expect(res.body.code).toBe('AUTH_INVALID_CREDENTIALS');
  });

  it('sucesso devolve usuario e token de acesso, nunca o refresh no corpo', async () => {
    authService.loginUser.mockResolvedValue(session);
    const res = mockRes();
    await login({ body: { email: 'a@b.co', password: 'qualquer' } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body.refreshToken).toBeUndefined();
    expect(res.body.accessToken).toBe('access');
  });
});

describe('refresh e logout', () => {
  it('refresh sem cookie: 401', async () => {
    const res = mockRes();
    await refresh({ cookies: {} }, res);
    expect(res.statusCode).toBe(401);
  });

  it('refresh invalido limpa o cookie e responde 401', async () => {
    const err = new Error('jwt malformed');
    err.name = 'JsonWebTokenError';
    authService.refreshSession.mockRejectedValue(err);
    const res = mockRes();
    await refresh({ cookies: { refreshToken: 'x' } }, res);
    expect(res.statusCode).toBe(401);
    expect(res.headers['Set-Cookie']).toMatch(/refreshToken=;/);
  });

  it('logout revoga a sessao e limpa o cookie', async () => {
    authService.logoutUser.mockResolvedValue(true);
    const res = mockRes();
    await logout({ cookies: { refreshToken: 'tok' } }, res);
    expect(authService.logoutUser).toHaveBeenCalledWith('tok');
    expect(res.statusCode).toBe(200);
  });
});
