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
- **Tokens (fonte de verdade):** `design/tokens.json` — formato **DTCG** (W3C Design Tokens): cor,
  tipografia, espaçamento, raio, sombra, motion.
- **Build multi-plataforma:** `pnpm tokens:build` (Style Dictionary) gera de `tokens.json` →
  variáveis CSS (web), tema NativeWind (mobile) e JSON (notificações/e-mail) em `design/build/`.
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
