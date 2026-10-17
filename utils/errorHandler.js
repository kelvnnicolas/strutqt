/**
 * Centralized error codes and response helper (ERR01)
 */

export const ErrorCodes = {
  AUTH_INVALID_CREDENTIALS: { status: 401, code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid email or password' },
  AUTH_TOKEN_EXPIRED:       { status: 401, code: 'AUTH_TOKEN_EXPIRED',       message: 'Authentication token has expired' },
  AUTH_UNAUTHORIZED:        { status: 401, code: 'AUTH_UNAUTHORIZED',        message: 'Authentication required' },
  AUTH_USER_EXISTS:         { status: 409, code: 'AUTH_USER_EXISTS',         message: 'A user with this email already exists' },
  VALIDATION_ERROR:         { status: 400, code: 'VALIDATION_ERROR',        message: 'Invalid input data' },
  NOT_FOUND:                { status: 404, code: 'NOT_FOUND',               message: 'Resource not found' },
  RATE_LIMITED:             { status: 429, code: 'RATE_LIMITED',             message: 'Too many requests, please try again later' },
  DB_CONNECTION_ERROR:      { status: 503, code: 'DB_CONNECTION_ERROR',     message: 'Database service unavailable' },
  INTERNAL_ERROR:           { status: 500, code: 'INTERNAL_ERROR',          message: 'Internal server error' },
};

/**
 * Erro de dominio: o service lanca, o controller converte em resposta.
 */
export class AppError extends Error {
  constructor(errorDef, details) {
    super(errorDef.message);
    this.name = 'AppError';
    this.errorDef = errorDef;
    this.details = details;
  }
}

/**
 * Converte qualquer erro lancado em resposta. Erros inesperados nao vazam a
 * mensagem original e so registram o nome e a mensagem, nunca o corpo da requisicao.
 */
export function handleError(res, error, context) {
  if (error instanceof AppError) {
    return sendError(res, error.errorDef, undefined, error.details);
  }
  console.error(`[ERROR] ${context}:`, error?.name, error?.message);
  return sendError(res, ErrorCodes.INTERNAL_ERROR);
}

/**
 * Send a structured error response.
 * @param {object} res - Next.js response object
 * @param {object} errorDef - One of the ErrorCodes entries
 * @param {string} [customMessage] - Override the default message
 * @param {any} [details] - Additional details (only included in development)
 */
export function sendError(res, errorDef, customMessage, details) {
  const body = {
    success: false,
    code: errorDef.code,
    message: customMessage || errorDef.message,
  };

  // `issues` (validacao de campos) e seguro em producao; o resto so em dev.
  if (details?.issues) {
    body.issues = details.issues;
  } else if (process.env.NODE_ENV !== 'production' && details) {
    body.details = details;
  }

  return res.status(errorDef.status).json(body);
}

/**
 * Send a structured success response.
 */
export function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, ...data });
}
