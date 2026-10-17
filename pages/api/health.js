import prisma from '../../utils/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let dbStatus = 'disconnected';

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (error) {
    console.error('[HEALTH] DB connection failed:', error.message);
    dbStatus = 'disconnected';
  }

  const status = dbStatus === 'connected' ? 'ok' : 'degraded';

  return res.status(status === 'ok' ? 200 : 503).json({
    status,
    db: dbStatus,
    timestamp: new Date().toISOString(),
  });
}
