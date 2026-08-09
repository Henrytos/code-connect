# 01 — Visão Geral: Tela de Login

## Objetivo

Criar a tela de login do sistema seguindo o modelo de design em `apps/frontend/public/Login.png`, construída com **Atomic Design**, estilizada com **Tailwind CSS** e coberta por **testes de componente** (Vitest + React Testing Library).

## Escopo

**Dentro:**
- Infraestrutura: instalar/configurar Tailwind CSS v4 e Vitest no `apps/frontend`
- Estrutura `src/components/{atoms,molecules,organisms,templates,pages}/`
- Componentes atômicos, moleculares, organism, template e página da tela de login
- Testes de componente para cada componente
- Documentação dos planos neste diretório `/plans/`

**Fora (explicitamente):**
- ❌ Tela de cadastro — **não será construída**, apenas os componentes serão preparados para reuso
- ❌ Integração com backend / API de autenticação
- ❌ Autenticação real (Google/GitHub OAuth) — botões sociais sem comportamento

## Ativos (em `apps/frontend/public/`)

| Arquivo | Uso |
|---|---|
| `Login.png` | Referência de design (layout a reproduzir) |
| `Logo.png` | Logo no painel do formulário |
| `Banner.png` | Imagem do painel esquerdo |
| `GitHub.png` | Ícone do botão social GitHub |
| `Google.png` | Ícone do botão social Google |

## Decisões técnicas

| Questão | Decisão | Justificativa |
|---|---|---|
| Estilização | Tailwind CSS v4 (CSS-first, plugin Vite) | Convenção do CLAUDE.md |
| Idioma | **Português (PT-BR)** — "Entrar", "Esqueci minha senha", "Lembrar de mim" | Interface em PT-BR |
| Comportamento "Entrar" | Visual + validação básica (campos obrigatórios, formato de email) | Sem backend por enquanto |
| Reuso no Cadastro | **`AuthLayout` (template) + `AuthForm` (organismo dirigido por config `fields`)** | Cadastro troca banner + lista de campos, sem alterar atoms/molecules/template |
| Botões sociais | `onClick` no-op (sem OAuth) | Integração futura |
| Roteamento | Sem router — `App.jsx` renderiza `<LoginPage />` | Router futuro quando houver CadastroPage |

## Entregáveis

1. Diretório `/plans/` com os documentos de planejamento
2. Infraestrutura de estilos e testes no `apps/frontend`
3. Tela de login renderizada em `http://localhost:5173` conforme `Login.png`
4. Todos os componentes com testes passando
5. Lint (oxlint) e build limpos

## Definição de pronto

- [ ] `pnpm --filter frontend test` — todos os testes verdes
- [ ] `pnpm --filter frontend lint` — sem erros
- [ ] `pnpm build:front` — build sem erros
- [ ] Visual em `localhost:5173` fiel ao `Login.png` (desktop e mobile)
- [ ] Componentes reutilizáveis para a futura tela de cadastro (ver doc 06)
