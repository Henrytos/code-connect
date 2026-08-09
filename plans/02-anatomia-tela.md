# 02 — Anatomia da Tela

Leitura do design em `apps/frontend/public/Login.png` e mapeamento para a hierarquia Atomic Design.

## Layout geral

Duas colunas em tela cheia (`min-h-screen`):

```
┌──────────────────────────┬───────────────────────────────┐
│        Banner            │         Painel de login        │
│     (ilustração)         │  ┌──────────┐                  │
│                          │  │  Logo    │                  │
│   Banner.png             │  └──────────┘                  │
│   preenche a coluna      │  Bem-vindo de volta            │
│                          │  subtitle                      │
│  (oculto em mobile)      │  ┌──────────┐                  │
│                          │  │ Email    │  FormField       │
│                          │  └──────────┘                  │
│                          │  ┌──────────┐                  │
│                          │  │ Senha    │  FormField       │
│                          │  └──────────┘                  │
│                          │  Esqueci minha senha →         │
│                          │  ┌─────────────────────┐       │
│                          │  │   Entrar   (roxo)   │       │
│                          │  └─────────────────────┘       │
│                          │  ── or continue with ──        │
│                          │  [Google]      [GitHub]         │
│                          │  Novo aqui? Criar conta →      │
└──────────────────────────┴───────────────────────────────┘
      (50%)                          (50%)
```

> O design do Login.png exibe o rótulo "Remember me" (checkbox) e "Forgot password" no alinhamento email/senha — a implementação usa os textos PT-BR "Lembrar de mim" e "Esqueci minha senha".

## Mapeamento atômico

| Nível | Componente | O quê renderiza no design |
|---|---|---|
| **Atom** | `Button` | Botão "Entrar" (primário roxo) e botões sociais (outline) |
| **Atom** | `Input` | Campos de email e senha |
| **Atom** | `Checkbox` | "Lembrar de mim" |
| **Atom** | `Icon` | Ícones Google/GitHub |
| **Atom** | `Logo` | Imagem `Logo.png` no topo do painel |
| **Atom** | `Banner` | Imagem full-bleed `Banner.png` no painel esquerdo |
| **Molecule** | `FormField` | Label + Input + mensagem de erro/hint (unidade genérica) |
| **Molecule** | `SocialButtons` | Botões Google + GitHub (Button outline + Icon) |
| **Organism** | `AuthForm` | Dirigido por config `fields`; estado dos campos, validação, composição |
| **Template** | `AuthLayout` | Grid 2 colunas: `banner` (esquerda) + `children` (direita) |
| **Page** | `LoginPage` | `AuthLayout` com `<Banner src="/Banner.png">` + `<AuthForm>` (config de login) |

## Conteúdo textual (PT-BR)

- Título: **Bem-vindo de volta** (do design "Welcome Back")
- Label + placeholder: **Email**, **Senha**
- Checkbox: **Lembrar de mim**
- Link: **Esqueci minha senha**
- Botão primário: **Entrar**
- Divisor: **ou continuar com**
- Botões sociais: **Google**, **GitHub**
- Link de rodapé: **Criar conta** (aponta para a futura tela de cadastro)

## Responsividade

- **Desktop (≥ lg)**: duas colunas 50/50, banner visível.
- **Mobile (< lg)**: banner **oculto** (`hidden lg:block`), painel ocupa 100% da largura.
