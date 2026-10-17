import { z } from 'zod';

// bcrypt ignora tudo depois de 72 bytes, entao o limite e em bytes, nao em caracteres.
const MAX_PASSWORD_BYTES = 72;

const email = z
  .string({ error: 'Email is required' })
  .trim()
  .toLowerCase()
  .max(254, 'Email is too long')
  .pipe(z.email('Invalid email address'));

const newPassword = z
  .string({ error: 'Password is required' })
  .min(8, 'Password must have at least 8 characters')
  .refine((value) => Buffer.byteLength(value, 'utf8') <= MAX_PASSWORD_BYTES, {
    message: 'Password is too long',
  });

export const signupSchema = z.object({
  email,
  password: newPassword,
  name: z.string().trim().min(1).max(100, 'Name is too long').optional(),
});

// No login nao aplicamos a regra de forca: so exigimos que os campos existam.
export const loginSchema = z.object({
  email,
  password: z
    .string({ error: 'Password is required' })
    .min(1, 'Password is required')
    .max(1024),
});

/**
 * Valida `data` com `schema`. Devolve { data } ou { issues }, onde issues e uma
 * lista curta de { field, message } segura para devolver ao cliente.
 */
export function parseInput(schema, data) {
  const result = schema.safeParse(data ?? {});
  if (result.success) return { data: result.data };
  return {
    issues: result.error.issues.map((issue) => ({
      field: issue.path.join('.') || null,
      message: issue.message,
    })),
  };
}
