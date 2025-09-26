# Delivery System

Sistema completo de delivery de marmitex utilizando T3 Stack.

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Prisma + PostgreSQL
- NextAuth.js
- Supabase Realtime
- Stripe
- Tailwind CSS + shadcn/ui

## Setup

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o banco de dados PostgreSQL
4. Copie `.env` e configure as variáveis:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
5. Execute as migrações: `npx prisma migrate dev`
6. Gere o cliente Prisma: `npx prisma generate`
7. Execute o seed (se houver)
8. Inicie o servidor: `npm run dev`

## Funcionalidades

- Loja do cliente com cardápio
- Painel administrativo com dashboard
- Tela da cozinha (KDS) com atualizações em tempo real
- Autenticação com roles (ADMIN, COZINHA)
- Integração com Stripe para pagamentos

## Estrutura

- `src/app/(public)/` - Páginas públicas da loja
- `src/app/admin/` - Páginas protegidas do admin
- `src/lib/` - Utilitários e configurações
- `src/components/` - Componentes reutilizáveis

## Desenvolvimento

Para desenvolvimento, use `npm run dev`.

Para build de produção: `npm run build`.
