import { verifyAccessToken } from '../utils/jwt';

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      req.user = decoded; // attaching decoded user payload to request
      
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired access token' });
    }
  };
}
