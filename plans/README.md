# Plans — Tela de Login

Índice dos planos de execução da tarefa **"Tela de Login"** (React + Atomic Design + Tailwind).

> Todos os planos desta tarefa ficam neste diretório `/plans/`. Cada documento cobre uma etapa, permitindo executar por partes e rastrear o progresso.

## Documentos

| # | Documento | Conteúdo |
|---|---|---|
| 01 | [01-visao-geral.md](01-visao-geral.md) | Objetivo, escopo, decisões, entregáveis, definição de pronto |
| 02 | [02-anatomia-tela.md](02-anatomia-tela.md) | Leitura do `Login.png` → grid, colunas → mapeamento atômico (PT-BR) |
| 03 | [03-setup-infraestrutura.md](03-setup-infraestrutura.md) | Tailwind v4 + Vitest + estrutura de pastas + commits A/B |
| 04 | [04-componentes.md](04-componentes.md) | Spec de cada componente (props, variantes, a11y, responsividade) |
| 05 | [05-testes.md](05-testes.md) | Estratégia de testes por componente + comandos |
| 06 | [06-reuso-cadastro.md](06-reuso-cadastro.md) | Contrato de reuso: como a futura tela de cadastro consumirá os componentes |

## Checklist de execução

- [x] **Fase 1 — Setup** (doc 03): Tailwind v4 (Commit A) + Vitest/RTL (Commit B) + estrutura `src/components/**`
- [x] **Fase 2 — Atoms** (doc 04): `Button`, `Input`, `Checkbox`, `Icon`, `Logo`, `Banner`
- [x] **Fase 3 — Molecules** (doc 04): `FormField`, `SocialButtons`
- [x] **Fase 4 — Organism + Template + Page** (doc 04): `AuthForm`, `AuthLayout`, `LoginPage`
- [x] **Fase 5 — Testes** (doc 05): `*.test.jsx` para todos os componentes
- [x] **Fase 6 — Verificação** (doc 03): test + lint + build + comparação visual

## Árvore de componentes

```
pages/       LoginPage
templates/   AuthLayout
organisms/   AuthForm
molecules/   FormField, SocialButtons
atoms/       Button, Input, Checkbox, Icon, Logo, Banner
```

> `AuthLayout` (template) + `AuthForm` (config `fields`) são os pontos-chave de reuso para a futura tela de cadastro (doc 06).

## Comandos úteis (raiz do repo)

```bash
pnpm dev:front                        # Vite dev server → http://localhost:5173
pnpm --filter frontend test:run       # Vitest (unit dos componentes, uma vez)
pnpm --filter frontend lint           # oxlint
pnpm build:front                      # vite build → apps/frontend/dist
```

## Stack

Node 22 · pnpm 11 · React 19 · Vite 8 · JavaScript (sem TypeScript) · Tailwind CSS v4 (CSS-first) · Vitest + React Testing Library · Interface em PT-BR.
