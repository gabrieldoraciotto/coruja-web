# Coruja 🦉 — frontend

Interface web do [Coruja](https://github.com/gabrieldoraciotto/coruja), a redação automática de conteúdo para Instagram. Next.js (App Router) + Tailwind, tema escuro azul-noite.

**Demo:** https://coruja-web-three.vercel.app

A visão geral do produto, a arquitetura e as decisões de engenharia estão documentadas no [repositório do backend](https://github.com/gabrieldoraciotto/coruja).

## Rodando localmente

```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:3333 npm run dev
```

`NEXT_PUBLIC_API_URL` aponta para o backend (sem barra no final). Por ser uma variável `NEXT_PUBLIC_*`, ela entra no build — em produção (Vercel), alterá-la exige um redeploy.
