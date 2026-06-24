# Perfil de stack: Mobile (Expo)

Use este perfil para apps iOS/Android.

## Stack
- **Framework:** React Native + Expo (managed) + TypeScript
- **Navegação:** Expo Router
- **Estilo:** NativeWind (Tailwind para React Native)
- **Testes:** Jest + React Native Testing Library
- **Gerenciador de pacotes:** pnpm

## Comandos
- Instalar: `pnpm install`
- Dev: `pnpm start` (Expo)
- Testes: `pnpm test`
- Build/distribuição: `eas build` / `eas submit`

## Bootstrap (projeto novo)
`pnpm create expo-app@latest . --template`

## Verificação (sem o usuário ler código)
- Rode os testes e mostre-os verdes.
- Suba no simulador (iOS Simulator / Android Emulator) e capture **screenshots** das telas afetadas para o PR.

## Honestidade sobre fricção
Mobile é o tipo de app com **mais fricção** para quem não é técnico: builds e publicação (App Store / Play Store) exigem contas de desenvolvedor pagas e passos manuais. Para validar rápido durante o desenvolvimento, use o app **Expo Go** no seu celular.

## Deploy nos trilhos
- **EAS (Expo Application Services)** para builds; **TestFlight** (iOS) e **Play Console — teste interno** (Android) para distribuir versões de teste.
