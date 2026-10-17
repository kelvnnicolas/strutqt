import { describe, expect, it } from 'vitest';
import { loginSchema, parseInput, signupSchema } from '../validators/auth';

describe('signupSchema', () => {
  it('normaliza e-mail (trim + minusculas)', () => {
    const { data } = parseInput(signupSchema, { email: '  Ana@Exemplo.COM ', password: 'senha-forte-1' });
    expect(data.email).toBe('ana@exemplo.com');
  });

  it('recusa corpo vazio ou ausente listando os campos', () => {
    for (const body of [undefined, null, {}]) {
      const { issues } = parseInput(signupSchema, body);
      expect(issues.map((i) => i.field).sort()).toEqual(['email', 'password']);
    }
  });

  it('recusa e-mail invalido', () => {
    const { issues } = parseInput(signupSchema, { email: 'nao-e-email', password: 'senha-forte-1' });
    expect(issues[0].field).toBe('email');
  });

  it('exige senha com 8+ caracteres', () => {
    const { issues } = parseInput(signupSchema, { email: 'a@b.co', password: '1234567' });
    expect(issues[0].field).toBe('password');
  });

  it('limita a senha a 72 bytes (limite do bcrypt)', () => {
    const ok = parseInput(signupSchema, { email: 'a@b.co', password: 'a'.repeat(72) });
    expect(ok.data).toBeDefined();
    const tooLong = parseInput(signupSchema, { email: 'a@b.co', password: 'a'.repeat(73) });
    expect(tooLong.issues[0].field).toBe('password');
    // 40 caracteres de 2 bytes = 80 bytes
    const multibyte = parseInput(signupSchema, { email: 'a@b.co', password: 'é'.repeat(40) });
    expect(multibyte.issues[0].field).toBe('password');
  });

  it('nao aceita tipos errados (senha numerica)', () => {
    const { issues } = parseInput(signupSchema, { email: 'a@b.co', password: 12345678 });
    expect(issues[0].field).toBe('password');
  });
});

describe('loginSchema', () => {
  it('nao aplica a regra de forca de senha', () => {
    const { data } = parseInput(loginSchema, { email: 'a@b.co', password: 'x' });
    expect(data.password).toBe('x');
  });

  it('exige e-mail e senha', () => {
    const { issues } = parseInput(loginSchema, {});
    expect(issues.map((i) => i.field).sort()).toEqual(['email', 'password']);
  });
});
