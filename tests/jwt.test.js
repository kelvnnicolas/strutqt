import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/jwt';

const user = { id: 'u1', email: 'a@b.co' };
const saved = { ...process.env };

beforeEach(() => {
  process.env.JWT_ACCESS_SECRET = 'a'.repeat(32);
  process.env.JWT_REFRESH_SECRET = 'r'.repeat(32);
});
afterEach(() => {
  process.env.JWT_ACCESS_SECRET = saved.JWT_ACCESS_SECRET;
  process.env.JWT_REFRESH_SECRET = saved.JWT_REFRESH_SECRET;
});

describe('utils/jwt', () => {
  it('assina e verifica o token de acesso', () => {
    expect(verifyAccessToken(generateAccessToken(user)).userId).toBe('u1');
  });

  it('token de acesso nao vale como refresh e vice-versa', () => {
    expect(() => verifyRefreshToken(generateAccessToken(user))).toThrow();
    expect(() => verifyAccessToken(generateRefreshToken(user))).toThrow();
  });

  it('nao assina nada sem o segredo (sem valor padrao)', () => {
    delete process.env.JWT_ACCESS_SECRET;
    expect(() => generateAccessToken(user)).toThrow('JWT_ACCESS_SECRET');
    delete process.env.JWT_REFRESH_SECRET;
    expect(() => generateRefreshToken(user)).toThrow('JWT_REFRESH_SECRET');
  });
});
