import { verifyAccessToken } from '../utils/jwt';
import { ErrorCodes, sendError } from '../utils/errorHandler';

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendError(res, ErrorCodes.AUTH_UNAUTHORIZED);
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      req.user = decoded; // attaching decoded user payload to request
      
      return handler(req, res);
    } catch (error) {
      return sendError(res, ErrorCodes.AUTH_TOKEN_EXPIRED);
    }
  };
}
