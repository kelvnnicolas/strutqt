import { me } from '../../../controllers/authController';
import { withAuth } from '../../../middlewares/authMiddleware';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  return withAuth(me)(req, res);
}
