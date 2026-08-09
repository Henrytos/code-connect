# 05 — Testes de Componente

Estratégia: **Vitest + React Testing Library + jest-dom + user-event**. Cada componente tem um teste colocado `*.test.jsx` cobrindo **render, interações-chave e variações de props**.

> Convenção do CLAUDE.md: todo componente exige teste. Rodar: `pnpm --filter frontend test` (root).
> **oxlint**: importar `{ describe, it, expect, vi } from 'vitest'` explicitamente em cada teste (globals continuam `false`).

## Cobertura por componente

### `atoms/Button/Button.test.jsx`
- Renderiza o `children` (label) e o `type` correto
- Variantes `primary`/`secondary`/`ghost` aplicam classes corretas
- `disabled` → botão desabilitado e não dispara `onClick`
- `fullWidth` aplica `w-full`
- `onClick` é chamado no clique

### `atoms/Input/Input.test.jsx`
- Renderiza com `placeholder` e valor controlado
- Chamada `onChange` ao digitar (user-event)
- Repassa a11y/`type`/`autoComplete` como props nativas
- `aria-invalid` presente quando erro

### `atoms/Checkbox/Checkbox.test.jsx`
- Renderiza o label
- Toggle no clique chama `onChange`
- Estado `checked` refletido

### `atoms/Icon/Icon.test.jsx`
- Renderiza `src` correto para `name="google"` e `name="github"`
- Aplica `size` (width/height)
- Exige `alt` (acessibilidade)

### `atoms/Logo/Logo.test.jsx`
- Renderiza `/Logo.png` com nome acessível (`alt`)

### `atoms/Banner/Banner.test.jsx`
- Renderiza `src` + `alt` no `<img>`

### `molecules/FormField/FormField.test.jsx`
- `getByLabelText` encontra o input (label ↔ id)
- Erro renderiza mensagem referenciada por `aria-describedby` (com `role="alert"`)
- `hint` exibido quando não há erro
- `required` chega ao input nativo

### `molecules/SocialButtons/SocialButtons.test.jsx`
- Renderiza Google e GitHub com nome acessível (ícone com `alt` + rótulo)
- Cada `onClick` (`onGoogleClick` / `onGitHubClick`) dispara

### `organisms/AuthForm/AuthForm.test.jsx`
- Renderiza título, subtítulo e logo
- Renderiza **um `FormField` por item de `fields`** (ex.: 2 campos no login)
- Digitar atualiza o valor controlado do campo correspondente
- Submit válido chama `onSubmit(values)` com `{ email, password }`
- Campo `required` vazio no submit → mensagem de erro e `onSubmit` **não** chamado
- `showRememberMe` → checkbox visível; sem ele → ausente
- `showSocials` → SocialButtons visível; `footer` renderizado
- A11y: inputs acessíveis via `getByLabelText`

### `templates/AuthLayout/AuthLayout.test.jsx`
- Renderiza o slot `banner` (com `src`/`alt`)
- Renderiza o slot `children`

### `pages/LoginPage/LoginPage.test.jsx`
- Renderiza o layout completo: banner (`/Banner.png`), título "Bem-vindo de volta", campos Email/Senha, botão "Entrar", botões sociais, link "Criar conta"
- `onSubmit` é repassado ao `AuthForm` (submit válido → chamado)

## Exemplo (FormField)

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormField from './FormField'

describe('FormField', () => {
  it('exibe a mensagem de erro', () => {
    render(<FormField id="email" label="Email" value="" onChange={() => {}} error="Campo obrigatório" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório')
  })

  it('alterna a visibilidade da senha via aria-describedby', async () => {
    const user = userEvent.setup()
    render(<FormField id="senha" label="Senha" type="password" value="" onChange={() => {}} />)
    const input = screen.getByLabelText('Senha')
    expect(input).toHaveAttribute('type', 'password')
  })
})
```

## Comandos

```bash
pnpm --filter frontend test                 # vitest (watch)
pnpm --filter frontend test:run             # roda uma vez (CI)
pnpm --filter frontend test -- <arquivo>    # apenas um arquivo
```
