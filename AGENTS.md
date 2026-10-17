<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Convenções do projeto (struqt)

- Camadas: `pages/api/*` → `controllers/` → `services/` → Prisma. Entrada validada com Zod em `validators/`; erros de domínio via `AppError` e `ErrorCodes` (`utils/errorHandler.js`).
- Nunca registrar em log corpo de requisição, e-mail, senha ou token. Erros inesperados saem como 500 genérico.
- Todo dado é filtrado por `workspaceId`. Evento é imutável e idempotente (`docs/eventos.md`).
- Segredos só por variável de ambiente, sem valor padrão. Antes de entregar: `npm run lint`, `npm test`, `npm run build`.
