import { signup } from '../../../controllers/authController';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  return signup(req, res);
}
