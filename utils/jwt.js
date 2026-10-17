import jwt from 'jsonwebtoken';

// Segredos lidos sob demanda: o app falha com erro claro se faltarem,
// em vez de assinar tokens com um valor padrao publico.
function requireSecret(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not defined in environment`);
  return value;
}

export function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    requireSecret('JWT_ACCESS_SECRET'),
    { expiresIn: '15m' }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    requireSecret('JWT_REFRESH_SECRET'),
    { expiresIn: '7d' }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, requireSecret('JWT_ACCESS_SECRET'));
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, requireSecret('JWT_REFRESH_SECRET'));
}
