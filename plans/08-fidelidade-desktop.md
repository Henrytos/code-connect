# 08 — Fidelidade Desktop

Refatoração da tela de login para corresponder ao design Figma nó `155:3785` (desktop).

## Layout

Duas colunas: banner ilustrativo à esquerda (oculto em mobile) + painel de formulário à direita. O painel tem largura `w-[996px]` com `px-[78px] py-[56px] rounded-[32px]`.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ┌──────────────┐  ┌─────────────────────────────────────┐    │
│  │              │  │                                     │    │
│  │   Banner     │  │   Logo (absoluto, bottom-left)      │    │
│  │   (full-bleed│  │                                     │    │
│  │    407×628)  │  │   Bem-vindo de volta                │    │
│  │              │  │   subtitle                            │    │
│  │   (oculto    │  │                                     │    │
│  │    < lg)     │  │   Email      [input]               │    │
│  │              │  │   Senha        [input]              │    │
│  │   h-[486px]  │  │                                     │    │
│  │   opacity-30 │  │   Esqueci minha senha →             │    │
│  │   bottom     │  │   ┌─────────────────────────────┐    │    │
│  │              │  │   │      Entrar (roxo)          │    │    │
│  │              │  │   └─────────────────────────────┘    │    │
│  └──────────────┘  │                                     │    │
│                    │   ── ou continuar com ──             │    │
│                    │   [Google]      [GitHub]              │    │
│                    │                                     │    │
│                    │   Novo aqui? Criar conta →            │    │
│                    │         (text-[#81fe88])              │    │
│  w-[996px]        └─────────────────────────────────────┘    │
│  px-[78px]                                               │    │
│  py-[56px]                                               │    │
│  rounded-[32px]                                          │    │
└────────────────────────────────────────────────────────────────┘
```

## Especificações de componentes (desktop)

### `AuthLayout`

- Container externo: `flex min-h-screen items-center justify-center bg-navy p-16 sm:p-24`
- Painel interno: `w-full max-w-[996px] overflow-hidden rounded-4xl bg-panel shadow-2xl lg:grid lg:grid-cols-2`
- Coluna banner (esquerda): `hidden lg:block` — `relative`, ocupa 50%
- Logo overlay no banner: `absolute bottom-16 left-16` (desktop)
- Coluna formulário (direita): `flex flex-col justify-center px-[78px] py-[56px]` → `px-[78px] py-[56px]` — padding específico desktop
- Padding mobile do formulário: `sm:px-14 lg:py-16` (já existente no código atual)

### `AuthForm`

- Título: `text-[31px]` Prompt SemiBold → `text-display-31 font-promptSemiBold`
- Subtítulo: `text-[22px]` Prompt Regular → `text-display-22`
- Spacing entre campos: `mt-24 flex flex-col gap-32`
- Seção remember-me + forgot-password: `mt-24 flex items-center justify-between gap-3`
- Botão submit: `bg-brand text-input-text px-[16px] py-[12px] rounded-[8px] text-[18px]` → `bg-brand text-input-text px-4 py-3 rounded-lg text-body-18`
- Link "Esqueci minha senha": `text-[#e1e1e1] text-[15px]` → `text-accent text-body-15 font-medium`
- Divisor "ou continuar com": `my-24 flex items-center gap-3`
- SocialButtons: `flex gap-24` (horizontal side-by-side em desktop)
- Footer "Novo aqui?": `mt-24`

### `FormField`

- Label: `text-[18px]` → `text-body-18`
- Input: `text-[15px]`, `bg-[#888]`, `px-[16px] py-[8px] rounded-[4px]` → `text-body-15 bg-input px-4 py-2 rounded`
- Erro/hint: `mt-1 text-body-15`

### `Button`

- `primary` variant desktop: `bg-brand text-input-text px-[16px] py-[12px] rounded-[8px] text-[18px]`
- `lg` size já configurado para `px-5 py-3 text-body-18` — verificar correspondência
- `secondary` variant para botões sociais

### `Checkbox`

- `border-2 border-[#888] rounded-[4px] p-[4px] size-[16px]` → `h-4 w-4 rounded border-line`
- Label: `text-body-15`

### `SocialButtons`

- `flex gap-24` (horizontal em desktop)
- Cada botão: `variant="secondary" fullWidth`

## Diferenças desktop vs código atual

| Aspecto | Código atual | Design Figma desktop | Ação |
|---|---|---|---|
| Painel largura | `max-w-[398px]` | `w-[996px]` | **Alterar** para `max-w-[996px]` |
| Padding painel | `px-16 py-24` | `px-[78px] py-[56px]` | **Alterar** para `px-[78px] py-[56px]` desktop |
| Título | `text-display-31` ✅ | `text-[31px]` | ✅ Já correto |
| Subtítulo | `text-display-22` ✅ | `text-[22px]` | ✅ Já correto |
| Labels | `text-body-15` | `text-[18px]` | **Alterar** para `text-body-18` |
| Inputs | `text-body-15` ✅ | `text-[15px]` | ✅ Já correto |
| Botão size | `lg` = `px-5 py-3` | `py-[12px]` = `py-3` | ✅ |
| Checkbox border | `border-line` | `border-2 border-[#888]` | **Verificar** se `border-line` = `#888` |
| Social gap | `gap-24` ✅ | `gap-24` | ✅ |
| Logo position desktop | `absolute bottom-16 left-16` | `bottom-left overlay` | ✅ Já correto |
| Botão primário cor | `bg-brand` (`#81fe88`) | `bg-[#81fe88]` | ✅ Já correto |

## Tokens Tailwind a verificar/ajustar

| Valor Figma | Token atual | Status |
|---|---|---|
| `w-[996px]` | `max-w-[398px]` | **Alterar** para `max-w-[996px]` |
| `px-[78px]` | `px-16` (16px=1rem≈48px?) | **Token custom** — adicionar `spacing.78` = `78px` |
| `py-[56px]` | `py-24` (24rem=384px) | **Token custom** — `py-3.5` = 56px ou `spacing.56` |
| `text-[31px]` | `text-display-31` | ✅ |
| `text-[22px]` | `text-display-22` | ✅ |
| `text-[18px]` | `text-body-18` | ✅ |
| `text-[15px]` | `text-body-15` | ✅ |
| `text-[12.5px]` | sem token | Verificar necessidade |
| `rounded-[32px]` | `rounded-4xl` | ✅ |
| `px-[16px]` | `px-4` | ✅ |
| `py-[8px]` | `py-2` | ✅ |
| `py-[12px]` | `py-3` | ✅ |
| `rounded-[8px]` | `rounded-lg` | ✅ |
| `rounded-[4px]` | `rounded` | ✅ |
| `size-[16px]` | `h-4 w-4` | ✅ |
| `h-[486px]`/`h-[487px]` | sem token | **Token custom** — `h-[486px]` |
| `opacity-30` | `opacity-30` | ✅ |

## Checklist de tarefas desktop

- [ ] Alterar `AuthLayout` para `max-w-[996px]` quando `lg:grid-cols-2` ativo
- [ ] Ajustar padding do painel direito desktop: `px-[78px] py-[56px]` → precisa de tokens `px-78`? ou `px-[78px]` custom
- [ ] Adicionar `spacing.78` e `spacing.56` ao `tailwind.config.js` (se necessário)
- [ ] Atualizar `FormField` label para `text-body-18` em desktop
- [ ] Verificar `Checkbox` usa `border-2 border-[#888]` ou equivalente via token
- [ ] Adicionar tokens `h-[486px]`/`h-[487px]` para símbolos decorativos desktop
- [ ] Garantir que `AuthLayout` responsive alterna corretamente entre mobile (`max-w-[648px]`) e desktop (`max-w-[996px]`)
- [ ] Testar visual em `localhost:5173` no breakpoint desktop (≥ lg)
- [ ] Atualizar testes se necessário

## Resolução de problema do `max-w-[398px]`

O código atual usa `max-w-[398px]` que foi mantido porque oxlint sugeriu `max-w-99.5` mas isso não corresponde ao design Figma. Para desktop, o painel precisa ser `w-[996px]` (não `max-w`), pois o design especifica uma largura fixa. Para mobile, o painel deve ser `w-full max-w-[648px]`.

**Solução proposta**: Usar `w-full lg:w-[996px]` no painel desktop, e `max-w-[648px]` no mobile. Alternativamente, usar `w-full max-w-none lg:max-w-[996px]` com `max-w-[648px]` para mobile.

## Notas

- O design Figma desktop `155:3785` tem proporção de tela mais larga com o banner ocupando ~50% da largura
- A logo `Logo.png` aparece como overlay absoluto no canto bottom-left do banner em desktop
- Os símbolos decorativos (`h-[486px]`/`h-[487px]` com `opacity-30`) ficam na parte inferior do banner em desktop
- O painel direito tem padding `px-[78px] py-[56px]` que dá um aspecto de "card" com bastante espaço interno
