# Status do projeto — struqt

> **Função:** registro do que já foi feito e do estado atual verificado. Serve para retomar o projeto.
> **Não guarda tarefas pendentes.** O que fazer a seguir está no [`nextmove.md`](nextmove.md).

**Última atualização:** 2026-10-17 · `main` com 3 commits, igual ao `origin/main` (`5ecbff4`); **20 arquivos com alterações locais ainda sem commit** (ver Estado atual)
**Repositório:** <https://github.com/kelvnnicolas/strutqt> (**público**, último push 2026-03-26). Conferido em 2026-10-17 com `git fetch`: `main` local e `origin/main` idênticos, 0 commits de diferença, sem outras branches.
**Produção:** nenhuma publicada que eu tenha verificado.
**Stack:** Next.js 16.2 (Pages Router) · React 19 · Tailwind 4 · Prisma 7 (PostgreSQL + Accelerate) · JWT (access 15 min + refresh 7 dias em cookie httpOnly) · JavaScript, com `lib/prisma.ts` solto em TypeScript.

## Como manter este arquivo

- Ao concluir um item do `nextmove.md`, adicione **uma linha** no [Registro de entregas](#registro-de-entregas) com o ID e o commit, e apague o item de lá.
- Atualize [Estado atual](#estado-atual) só quando algo mudar de estado.
- Marque ✅ só o que foi verificado (teste rodado ou testado ao vivo).
- Decisão que vale para o projeto todo vai em [Decisões registradas](#decisões-registradas).

**Legenda:** ✅ verificado · 🟡 existe, sem verificação · ❌ não feito · ⏸️ adiado por decisão

---

## Estado atual

Avaliação feita em 2026-10-17 por leitura do código e execução do ESLint. **Não rodei** `npm run build`, o servidor nem nenhum fluxo no navegador.

| Área | Estado | Observação |
|---|---|---|
| Landing (`/`, `/features`, `/pricing`, `/docs`, `/templates`) | 🟡 | Componentes de marketing (Hero, Features, ValueProposition, FinalCTA, Pricing…). Hero, Features, Navbar, FinalCTA e ValueProposition estão **só na árvore de trabalho**, não commitados. |
| Autenticação (signup, login, refresh, logout, `/me`) | 🟡 | Controller → service → Prisma, bcryptjs, JWT, rotação do refresh token. Segredos JWT obrigatórios e sem log de senha (verificado em Node). **Fluxo completo contra o banco não executado.** Sem testes. |
| Rotas protegidas | 🟡 | `middleware.js` só confere se o cookie `refreshToken` existe; não valida o token. `ProtectedRoute` no cliente complementa. |
| Dashboard | ❌ | `pages/dashboard.js` usa lista fixa de 3 quizzes e métricas escritas à mão ("1,390"). |
| Quizzes, perguntas, leads, analytics | ❌ | Modelos existem em `prisma/schema.prisma`; **não há nenhuma rota de API nem tela que os use**. É o núcleo do produto. |
| Checkout, cobrança, planos | ❌ | `pages/checkout.js` (328 linhas), `billing`, `payment-*` são telas estáticas; nenhuma chamada a gateway. Modelos `Plan`/`Subscription` sem uso. |
| Banco de dados | 🟡 | `schema.prisma` em PostgreSQL com 11 modelos. **Sem pasta `prisma/migrations`**. `dev.db` saiu do Git na branch (continua no histórico público; tabelas vazias, verificado). |
| Variáveis de ambiente | ✅ | `.env` fora do Git; `.env.example` criado com as 4 variáveis. |
| Lint | ✅ | `npm run lint`: 0 erros, 3 avisos (`<img>` em AvatarUpload e Navbar). Verificado em 2026-10-17. |
| Build | ✅ | `npm run build` passa (21 rotas), 2026-10-17. |
| Testes | ❌ | Nenhum, nem script `test` no `package.json`. |
| CI | ❌ | Sem `.github/`. |
| Deploy | ❌ | Sem `.vercel`, sem workflow. |
| README | ❌ | É o texto padrão do `create-next-app` (cita `pages/api/hello.js`, Geist). |
| Docs para agentes | 🟡 | `AGENTS.md` / `CLAUDE.md` só trazem o aviso padrão do Next 16. Sem convenções do projeto. |

### Local × GitHub (2026-10-17)

- O que está no GitHub é exatamente o commit `5ecbff4`. **As alterações abaixo existem só neste computador**: landing nova, `errorHandler`, rota `health`, mudanças de Prisma e auth. Nada disso tem cópia.
- `.env` **nunca** foi commitado (histórico conferido). Os segredos padrão de `utils/jwt.js` (`super_secret_access_key_123` etc.) **estão no histórico público**.
- O `dev.db` público não contém usuários nem sessões.

### Alterações locais (2026-10-17) — agora commitadas na branch

14 arquivos modificados + 6 novos, ~1060 inserções / 1808 remoções (a maior parte é `package-lock.json` e `dev.db`):

- Modificados: `components/{Features,Hero,Navbar}.js`, `context/AuthContext.js`, `controllers/authController.js`, `services/authService.js`, `pages/{index,login}.js`, `prisma/schema.prisma`, `prisma.config.ts`, `utils/prisma.js`, `package.json`, `package-lock.json`, `dev.db`.
- Novos: `components/{FinalCTA,ValueProposition}.js`, `lib/prisma.ts`, `pages/api/health.js`, `utils/errorHandler.js`, `utils/password.js`.

### Mapa da estrutura

```
pages/            rotas (Pages Router) + pages/api/{auth/*,health,hello}
components/       24 componentes de UI (landing, auth, dashboard)
context/          AuthContext (user, login, signup, logout)
controllers/      authController (req/res)
services/         authService (regras + Prisma)
middlewares/      authMiddleware (withAuth para API routes)
middleware.js     redirecionamento de rotas protegidas
utils/            jwt, hash, password, prisma, api (axios), errorHandler
lib/              prisma.ts (duplicata de utils/prisma.js)
prisma/           schema.prisma
```

### Pontos de qualidade já identificados

Pendentes no [`nextmove.md`](nextmove.md): validação de entrada, `errorHandler` sem uso, sem migrations, refresh sem transação, sem testes nem CI.

---

## Decisões registradas

1. **Pages Router**, não App Router (estado atual do código). Mudar exige decisão explícita (D-001 no `nextmove.md`).
2. **Refresh token em cookie httpOnly + `sameSite: strict`, access token em memória** (via `setAuthToken`), com rotação a cada refresh. Mantido.

---

## Registro de entregas

Mais recente primeiro. Uma linha por entrega; IDs referem-se ao `nextmove.md`.

### 2026-10-17
- **Primeiras implementações** (branch `chore/estrutura`, 6 commits, **sem push**): pasta renomeada para `strutqt` (igual ao GitHub); **B-001** signup não loga mais a senha nem o e-mail (c35c43a); **B-002** `utils/jwt.js` sem segredo padrão, falha com erro claro (c35c43a; verificado em Node: sem env lança erro, com env assina e o token de acesso não vale como refresh); **T-002** `dev.db` fora do Git e `*.db` ignorado (7639197); **T-003** `eslint@9` + `eslint-config-next@16.2.0`, 8 erros de lint corrigidos, 0 erros restantes (334a486, 09803f7); **T-005** `bcrypt` nativo e `utils/password.js` removidos; **T-006** `lib/prisma.ts` removido, fica `utils/prisma.js`; `.env.example` criado. Verificado: `npm run lint` (0 erros) e `npm run build`. **Não verificado:** login/signup contra o banco, `/api/health`. Os 3 avisos de lint (`<img>`) ficaram.
- **Avaliação inicial e estrutura de acompanhamento**: criados `STATUS.md` e `nextmove.md` no formato do SaúdeConecta. Nenhum código alterado.

### Histórico do Git
- `5ecbff4` Sistema de autenticação completo (signup, login, logout, refresh, usuário) e páginas de marketing, preços e checkout.
- `ddb1b38` Componentes de UI, páginas e lógica de autenticação iniciais.
- `5220eec` Commit inicial do Create Next App (2026-03-20).
