# 🤖 Projeto de Estudo — IA para Impulsionar o Desenvolvimento

> **Propósito**: Este repositório é um projeto de estudo que explora como a inteligência artificial pode ser utilizada como parceira de desenvolvimento — acelerando a entrega, mantendo a qualidade e ensinando boas práticas — sem substituir o pensamento crítico do desenvolvedor.

[![Node.js](https://img.shields.io/badge/Node.js-22-green)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-11-%23F6921E?logo=pnpm&logoColor=white)](https://pnpm.io)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![NestJS](https://img.shields.io/badge/NestJS-11-ED2345?logo=nestjs&logoColor=white)](https://nestjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-v4-646CFF?logo=vitest&logoColor=white)](https://vitest.dev)
[![Oxlint](https://img.shields.io/badge/Oxlint-v1-5C3BDB?logo=eslint&logoColor=white)](https://oxlint.rs)

## 🎯 Visão Geral

Este projeto demonstra, na prática, como a IA auxilia no ciclo completo de desenvolvimento de software:

| Fase | O que a IA faz | O que o dev faz |
|------|---------------|-----------------|
| **Planejamento** | Analisa designs Figma, gera especificações e plano de tarefas | Revisa e aprova o plano |
| **Codificação** | Escreve componentes seguindo atomic design, tokens e convenções | Valida, ajusta e refine |
| **Estilização** | Extrai tokens exatos do Figma (cores, espaçamentos, tipografia) | Define a escala e valida |
| **Testes** | Gera testes cobrindo cenários essenciais | Verifica cobertura e edge cases |
| **Verificação** | Executa lint, build e testes automaticamente | Analisa resultados e corrige |
| **Documentação** | Mantém planos, contratos de reuso e convenções atualizados | Garante consistência |

## 📁 Estrutura do Projeto

```
project-claude/
├── apps/
│   ├── frontend/                          # React 19 + Vite 8 + Tailwind CSS v4
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── atoms/                 # Button, Input, Checkbox, Icon, Logo, Banner
│   │   │   │   ├── molecules/             # FormField, SocialButtons
│   │   │   │   ├── organisms/             # AuthForm
│   │   │   │   ├── templates/             # AuthLayout
│   │   │   │   └── pages/                 # LoginPage
│   │   │   ├── index.css                  # Tailwind + font-family Prompt
│   │   │   └── test/setup.js              # Vitest + Testing Library
│   │   ├── tailwind.config.js             # Tokens extraídos do Figma
│   │   └── public/                        # Banner.png, Logo.png, Google.png, GitHub.png
│   └── backend/                           # NestJS 11 (TypeScript)
├── plans/                                 # Documentos de planejamento e especificações
│   ├── 01-visao-geral.md
│   ├── 02-anatomia-tela.md
│   ├── 03-setup-infraestrutura.md
│   ├── 04-componentes.md
│   ├── 05-testes.md
│   ├── 06-reuso-cadastro.md
│   ├── 07-fidelidade-mobile.md            # Especificações Figma 155:3661
│   └── 08-fidelidade-desktop.md           # Especificações Figma 155:3785
├── pnpm-workspace.yaml
├── CLAUDE.md                              # Diretrizes do projeto (convenções, comandos, arquitetura)
└── README.md                              # Este arquivo
```

## 🚀 Comandos

```bash
# Desenvolvimento
pnpm dev              # ambos os apps em paralelo
pnpm dev:front        # Vite dev server → http://localhost:5173
pnpm dev:back         # NestJS watch mode → http://localhost:3000

# Build
pnpm build            # ambos os apps
pnpm build:front      # vite build → apps/frontend/dist
pnpm build:back       # nest build → apps/backend/dist

# Lint
pnpm --filter frontend lint   # oxlint (NOT eslint)
pnpm --filter backend lint    # eslint --fix
pnpm --filter backend format  # prettier --write

# Testes (backend apenas)
pnpm --filter backend test          # unit tests
pnpm --filter frontend test         # Vitest (componentes frontend)
pnpm --filter backend test:cov      # cobertura
```

## 🏗️ Stack

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **Frontend** | React 19 + Vite 8 + Tailwind CSS v4 | Interface do usuário |
| **Backend** | NestJS 11 + TypeScript | API REST |
| **Testes** | Vitest + React Testing Library | Componentes frontend |
| **Lint** | oxlint | Frontend |
| **Package Manager** | pnpm 11 | Monorepo |
| **Design** | Figma + CodeConnect | Design tokens e especificações |
| **IA** | Claude Code | Assistente de desenvolvimento |

## 📐 Convenções

### Commits
Este projeto segue o padrão **Conventional Commits**:
```
<type>(<scope>): <description>
```
- `feat` — nova funcionalidade
- `fix` — correção de bug
- `refactor` — refatoração
- `docs` — documentação
- `test` — testes
- `chore` — manutenção
- Escopes: `front` ou `back`

### Arquitetura Frontend — Atomic Design
```
atoms/       → Button, Input, Checkbox, Icon, Logo, Banner
molecules/   → FormField, SocialButtons
organisms/   → AuthForm
templates/   → AuthLayout
pages/       → LoginPage
```

### Design Tokens
Todas as cores, espaçamentos e tipografias são extraídos do Figma e definidos no `tailwind.config.js`. Nenhum valor hardcoded em px ou hex é permitido no código JSX.

## 🤖 O Papel da IA Neste Projeto

A IA atua como **copiloto**, não como substituta:

1. **Analisa designs** — Extrai tokens exatos do Figma (cores, tipografia, espaçamentos)
2. **Gera código estrutural** — Segue as convenções do projeto (atomic design, Tailwind, TypeScript)
3. **Cria testes** — Coberura de cenários essenciais para cada componente
4. **Mantém documentação** — Planos de execução e contratos de reuso atualizados
5. **Verifica qualidade** — Lint, build e testes executados automaticamente

> **Aprendizado-chave**: A IA é mais eficaz quando o desenvolvedor fornece contexto claro (designs, convenções, expectativas). A qualidade do output depende da qualidade do input.

## 📚 Documentos de Planejamento

| # | Documento | Conteúdo |
|---|-----------|----------|
| 01 | [01-visao-geral.md](plans/01-visao-geral.md) | Objetivo, escopo, decisões |
| 02 | [02-anatomia-tela.md](plans/02-anatomia-tela.md) | Layout e mapeamento atômico |
| 03 | [03-setup-infraestrutura.md](plans/03-setup-infraestrutura.md) | Tailwind + Vitest + estrutura |
| 04 | [04-componentes.md](plans/04-componentes.md) | Spec de cada componente |
| 05 | [05-testes.md](plans/05-testes.md) | Estratégia de testes |
| 06 | [06-reuso-cadastro.md](plans/06-reuso-cadastro.md) | Contrato de reuso para cadastro |
| 07 | [07-fidelidade-mobile.md](plans/07-fidelidade-mobile.md) | Fidelidade Figma mobile |
| 08 | [08-fidelidade-desktop.md](plans/08-fidelidade-desktop.md) | Fidelidade Figma desktop |

## ✅ Definição de Pronto

- [ ] `pnpm --filter frontend test` — todos os testes verdes
- [ ] `pnpm --filter frontend lint` — sem erros
- [ ] `pnpm build:front` — build sem erros
- [ ] Visual fiel aos designs Figma (desktop e mobile)
- [ ] Componentes reutilizáveis para futuras telas

## 📝 Licença

Projeto de estudo — sem fins comerciais.

---

*Este repositório foi construído com o auxílio de inteligência artificial como ferramenta de aprendizado e produtividade. O objetivo é documentar o processo de como a IA pode ser integrada ao fluxo de desenvolvimento mantendo a responsabilidade e a qualidade do código.*
