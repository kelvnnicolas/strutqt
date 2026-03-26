import prisma from '../utils/prisma';
import { hashPassword, verifyPassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export async function createUser(email, password, name) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');
  
  const passwordHash = await hashPassword(password);
  
  const user = await prisma.user.create({
    data: { email, passwordHash, name }
  });
  
  return { id: user.id, email: user.email, name: user.name, avatar: user.avatar };
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Store refresh token session
  await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  });

  return {
    user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
    accessToken,
    refreshToken
  };
}

export async function refreshSession(token) {
  const payload = verifyRefreshToken(token); // Throws if invalid
  const session = await prisma.session.findUnique({ where: { refreshToken: token }, include: { user: true } });
  if (!session) throw new Error('Session not found');
  if (session.expiresAt < new Date()) throw new Error('Session expired');

  // Rotate token (security best practice)
  await prisma.session.delete({ where: { id: session.id } });
  
  const newAccessToken = generateAccessToken(session.user);
  const newRefreshToken = generateRefreshToken(session.user);

  await prisma.session.create({
    data: {
      userId: session.user.id,
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logoutUser(token) {
  await prisma.session.deleteMany({ where: { refreshToken: token } });
  return true;
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, avatar: true }
  });
}
