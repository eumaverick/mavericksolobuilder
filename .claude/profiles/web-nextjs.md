# Perfil de stack: Web (Next.js)

Use este perfil para aplicações web. É o caminho mais amigável para quem não é técnico.

## Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui
- **Gerenciador de pacotes:** pnpm (fallback: npm)
- **Testes:** Vitest + Testing Library (unit/componentes); Playwright (e2e, opcional)
- **Lint/format:** ESLint + Prettier

## Comandos
- Instalar: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Testes: `pnpm test`
- Lint: `pnpm lint`

## Bootstrap (projeto novo)
`pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --use-pnpm`
Depois inicialize o shadcn/ui: `pnpm dlx shadcn@latest init`.

## Verificação (provar que funciona, sem o usuário ler código)
- Suba o app (`pnpm dev`) e abra no navegador via **Claude no Chrome**.
- Tire **screenshots** das telas afetadas e anexe ao PR.
- Confira estados: carregando, vazio, erro, sucesso; e responsividade (mobile/desktop).

## Deploy nos trilhos
- **Vercel.** Conecte o repositório; cada PR gera um *preview deploy* automático e o merge na main publica em produção. Sem configuração manual de servidor.

## Design system & acessibilidade
- Componentes: **shadcn/ui** (sobre Radix, acessível) + Tailwind. Catálogo navegável no **Storybook**.
- Acessibilidade: meta **WCAG 2.2 AA**; valide com **axe-core** (addon a11y do Storybook / Playwright) e **Lighthouse**.
- Protótipos navegáveis = páginas reais; gere preview na Vercel para navegação por URL.
