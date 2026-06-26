# <NOME DO PRODUTO>

> CLAUDE.md do produto — gerado pelo Maverick Solo Builder. Preencha os campos `<...>`.

## Visão
<O que é o produto e qual problema de negócio resolve.>

## Stack
- Perfil: `<web-nextjs | backend-node | mobile-expo>`
- <Detalhes específicos: libs principais, serviços externos, banco...>

## Design System
> **Fonte de verdade do design.** Tech Lead e Devs consultam aqui ANTES de criar/alterar qualquer UI
> (web, mobile, notificações, e-mail). Nada de cor/espaçamento "mágico" — tudo deriva dos tokens.
- **Tokens (fonte de verdade):** `<caminho dos tokens>` — formato **DTCG** (W3C Design Tokens): cor,
  tipografia, espaçamento, raio, sombra, motion. _Default `design/tokens.json` na raiz; em **monorepo**,
  um pacote como `packages/design-tokens/`. **Este caminho aqui é a referência oficial** — Tech Lead e Devs
  seguem o que estiver registrado nesta seção, não um caminho fixo._
- **Build multi-plataforma:** `<comando de build, ex.: pnpm tokens:build>` (Style Dictionary) gera dos tokens →
  variáveis CSS (web), tema NativeWind (mobile) e JSON (notificações/e-mail) num `build/` versionado.
- **Componentes:** `<caminho>` (shadcn/Radix + Tailwind), catalogados no Storybook.
- **Catálogo navegável (Storybook):** local `pnpm storybook` · publicado em `<URL Vercel>`.
- **Protótipos navegáveis:** `<URL Vercel do protótipo>`.
- **Acesso de stakeholders:** `<como logar — ex.: gate de login simples por usuário/senha>`.

## Convenções de código
<Padrões a seguir: estrutura de pastas, nomenclatura, estilo. Atualize conforme o projeto evolui.>

## Comandos
- Instalar: `<...>`
- Dev: `<...>`
- Testes: `<...>`
- Build: `<...>`
- Deploy: `<...>`

## Verificação
<Como provar que uma mudança funciona, sem ler código — screenshot, teste, request de exemplo.>

## Linear
- Projeto: **<nome>** (ID: `<linear-project-id>`)
- Etiquetas de complexidade: `junior`, `pleno`, `senior`

## Decisões de arquitetura
<Registre aqui decisões técnicas duradouras, com data e motivo.>
