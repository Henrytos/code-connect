# 07 — Fidelidade Mobile (Tablet)

Refatoração da tela de login para corresponder ao design Figma nó `155:3661` (mobile/tablet).

## Layout

Coluna única centralizada. O painel de formulário ocupa a largura máxima de `w-[648px]` com `px-[60px] py-[56px] rounded-[32px]`. O banner ilustrativo está oculto em mobile.

```
┌─────────────────────────────────────┐
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │
│    │   ┌─── Logo ─────────┐  │      │
│    │   │                  │  │      │
│    │   │  Bem-vindo de    │  │      │
│    │   │  volta           │  │      │
│    │   └──────────────────┘  │      │
│    │                         │      │
│    │   Email      [input]  │      │
│    │   Senha        [input]│      │
│    │                         │      │
│    │   Esqueci minha senha → │      │
│    │   ┌──────────────────┐  │      │
│    │   │    Entrar        │  │      │
│    │   └──────────────────┘  │      │
│    │                         │      │
│    │   ── ou continuar com ──│      │
│    │   [Google] [GitHub]    │      │
│    │                         │      │
│    │   Novo aqui? Criar...  │      │
│    │                         │      │
│    └─────────────────────────┘      │
│         w-[648px]                   │
│         px-[60px] py-[56px]        │
│         rounded-[32px]             │
└─────────────────────────────────────┘
```

## Especificações de componentes (mobile)

### `AuthLayout`

- Container externo: `flex min-h-screen items-center justify-center bg-navy p-16 sm:p-24`
- Painel interno: `w-full max-w-[648px] overflow-hidden rounded-4xl bg-panel shadow-2xl` (sem grid `lg:grid-cols-2` — coluna única)
- Logo no topo do painel: `mb-24` (visível em mobile)
- Sem coluna de banner (`hidden` por padrão em mobile)
- Padding interno do painel: `px-[60px] py-[56px]` → `px-16 py-24` (via tokens)

### `AuthForm`

- Título: `text-[26px]` Prompt SemiBold → `text-label-16` (verificar token) ou `text-[26px]` custom
- Subtítulo: `text-[22px]` Prompt Regular → `text-display-22`
- Spacing entre campos: `gap-32` (form fields)
- Seção remember-me + forgot-password: `mt-24 flex items-center justify-between gap-3`
- Botão submit: `bg-brand text-input-text px-[16px] py-[12px] rounded-[8px] text-[18px]` → `bg-brand text-input-text px-4 py-3 rounded-lg text-body-18`
- Link "Esqueci minha senha": `text-[#e1e1e1] text-[15px]` → `text-accent text-body-15 font-medium`
- Divisor "ou continuar com": `my-24 flex items-center gap-3`
- SocialButtons: `flex gap-24` (gap horizontal)
- Footer "Novo aqui? Criar conta": `mt-24` → `mt-24 text-center text-body-15 text-form-muted`

### `FormField`

- Label: `text-[18px]` → `text-label-16` ou `text-body-18` (verificar token existente)
- Input: `text-[15px]`, `bg-[#888]`, `px-[16px] py-[8px] rounded-[4px]` → `text-body-15 bg-input px-4 py-2 rounded`
- Erro/hint: `mt-1 text-body-15`

### `Button`

- `primary` variant: `bg-brand text-input-text px-[16px] py-[12px] rounded-[8px] text-[18px]`
- `secondary` variant (social): border + fundo transparente
- `lg` size atual já mapea para `px-5 py-3 text-body-18` — verificar se `py-3` ≈ `12px`

### `Checkbox`

- `border-2 border-[#888] rounded-[4px] p-[4px] size-[16px]` → `h-4 w-4 rounded border-line`
- Label: `text-body-15`

### `SocialButtons`

- `flex gap-24` (horizontal side-by-side)
- Cada botão: `variant="secondary" fullWidth`
- Label interno: `text-[12.5px]` para labels auxiliares

## Tokens Tailwind a verificar/ajustar

| Valor Figma | Token atual | Status |
|---|---|---|
| `w-[648px]` | `max-w-[398px]` (desktop) | **Precisa ajuste** — mobile precisa `max-w-[648px]` |
| `px-[60px]` | `px-16` (16px=1rem≈48px? Não) | **Precisa token** — adicionar `spacing: { 60: '60px' }` |
| `py-[56px]` | `py-24` (24=24px) | Verificar — `py-24` = 6rem = 96px, não 56px |
| `text-[26px]` | `text-display-22` existe | **Precisa token** — adicionar `display-26` |
| `text-[18px]` | `text-body-18` existe | ✅ |
| `text-[15px]` | `text-body-15` existe | ✅ |
| `text-[12.5px]` | sem token | **Precisa token** — adicionar `label-12-5` |
| `rounded-[32px]` | `rounded-4xl` (32px=2rem) | ✅ |
| `px-[16px]` | `px-4` (16px=1rem) | ✅ |
| `py-[8px]` | `py-2` (8px=0.5rem) | ✅ |
| `py-[12px]` | `py-3` (12px=0.75rem) | ✅ |
| `rounded-[8px]` | `rounded-lg` (8px=0.5rem? Não=0.5rem=8px) | `rounded-lg` = 0.5rem = 8px ✅ |
| `rounded-[4px]` | `rounded` (4px=0.25rem) | ✅ |
| `size-[16px]` checkbox | `h-4 w-4` (16px=1rem) | ✅ |
| `h-[343px]`/`h-[340px]` | sem token | **Precisa token** — adicionar `h-[343px]` |

## Checklist de tarefas mobile

- [ ] Ajustar `AuthLayout` para painel `max-w-[648px]` sem grid 2 colunas em mobile
- [ ] Adicionar tokens faltantes ao `tailwind.config.js`: `spacing.60`, `display-26`, `label-12-5`, `h-[343px]`/`h-[340px]`
- [ ] Corrigir `py-[56px]` → token correto (atual `py-24` = 96px, precisa de `py-3.5` = 56px ou token custom)
- [ ] Ativar `text-[26px]` para título mobile (o `text-label-16` não funciona — verificar se `display-26` precisa ser criado)
- [ ] Atualizar `SocialButtons` para `gap-24` horizontal
- [ ] Verificar `Checkbox` border `border-2 border-[#888]` corresponde ao design
- [ ] Testar visual em `localhost:5173` no breakpoint mobile (< lg)
- [ ] Atualizar testes se necessário

## Notas

- O design Figma mobile `155:3661` mostra o formulário como um card centrado com bordas arredondadas (`rounded-[32px]`) e sombra
- Os símbolos decorativos (`h-[343px]`/`h-[340px]` com `opacity-30`) ficam nas laterais do painel em mobile, diferente de desktop onde ficam no bottom
- A logo `Logo.png` é visível no topo do card em mobile (não na banner esquerda)
