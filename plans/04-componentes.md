# 04 — Especificação dos Componentes

Todos os componentes ficam em `apps/frontend/src/components/<nível>/<Nome>/<Nome>.jsx` com teste colocado `Nome.test.jsx`. Estilização 100% Tailwind (utility classes).

> **Convenção de reuso**: `Button`, `Input`, `Checkbox`, `Icon`, `Logo`, `Banner`, `FormField` e `SocialButtons` são genéricos (sem conhecimento de "login"). O `AuthForm` é dirigido por config `fields` e o `AuthLayout` é o template com slots de banner + children — é isso que permite à futura tela de cadastro reutilizar tudo trocando apenas banner + campos (ver doc 06).

## Árvore de componentes

```
pages/
  LoginPage/LoginPage.jsx            ← compõe AuthLayout + AuthForm (config de login)
templates/
  AuthLayout/AuthLayout.jsx          ← grid 2 colunas; slot `banner` + slot `children`
organisms/
  AuthForm/AuthForm.jsx              ← logo + título + FormFields (de `fields`) + remember-me + submit + socials + footer
molecules/
  FormField/FormField.jsx            ← label + Input + erro/hint; conecta aria-*
  SocialButtons/SocialButtons.jsx    ← botões Google + GitHub (Button + Icon)
atoms/
  Button/Button.jsx                  ← <button> nativo; variant/size/fullWidth/disabled
  Input/Input.jsx                    ← <input> nativo; repassa props de a11y
  Checkbox/Checkbox.jsx              ← checkbox com label ("Lembrar de mim")
  Icon/Icon.jsx                      ← renderiza /Google.png | /GitHub.png com `alt` (obrigatório)
  Logo/Logo.jsx                      ← renderiza /Logo.png com `alt`
  Banner/Banner.jsx                  ← <img> full-bleed (`object-cover`) que preenche o painel esquerdo
```

---

## Atoms

### `atoms/Button/Button.jsx`

Botão `<button>` nativo, com variantes.

**Props**: `children`, `type='button'`, `variant='primary'|'secondary'|'ghost'`, `size`, `fullWidth`, `disabled`, `onClick`.

- `primary` → `bg-[#aa3bff] text-white hover:bg-[#aa3bff]/90`
- `secondary` → borda + fundo claro (para botões sociais)
- `ghost` → sem fundo/borda (para links-acionáveis se necessário)
- `disabled` → `disabled:opacity-50 disabled:cursor-not-allowed`
- `focus-visible` → `focus-visible:ring-2 focus-visible:ring-[#aa3bff]/50`

---

### `atoms/Input/Input.jsx`

Campo `<input>` nativo, sem label. Repassa props de a11y.

**Props**: `id`, `name`, `type='text'`, `value`, `onChange`, `placeholder`, `required`, `autoComplete`, `aria-invalid`, `aria-describedby`, + rest props.

**Estado de erro** (borda vermelha): via `aria-invalid` (true) — classe condicional.

---

### `atoms/Checkbox/Checkbox.jsx`

Checkbox com label ("Lembrar de mim").

**Props**: `id`, `name`, `label`, `checked`, `onChange`.

```jsx
<label className="flex items-center gap-2">
  <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
  <span className="text-sm text-ink">{label}</span>
</label>
```

---

### `atoms/Icon/Icon.jsx`

Ícone de login social.

**Props**: `name='google'|'github'`, `size=20`, `alt` (**obrigatório**).

```jsx
const SRC = { google: '/Google.png', github: '/GitHub.png' }
<img src={SRC[name]} alt={alt} width={size} height={size} className="h-auto" />
```

---

### `atoms/Logo/Logo.jsx`

Logo do sistema.

**Props**: `className`.

```jsx
<img src="/Logo.png" alt="Logo do sistema" className={className} />
```

---

### `atoms/Banner/Banner.jsx`

Imagem full-bleed do painel esquerdo.

**Props**: `src`, `alt`.

```jsx
<img src={src} alt={alt} className="h-full w-full object-cover" />
```

---

## Molecules

### `molecules/FormField/FormField.jsx`

**Unidade genérica de reuso** — label + input + erro/hint. Não conhece "login".

**Props**: `id`, `label`, `type='text'`, `value`, `onChange`, `placeholder`, `required`, `autoComplete`, `error=null`, `hint=null`.

```jsx
<div>
  <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
  <Input
    id={id} name={id} type={type} value={value} onChange={onChange}
    placeholder={placeholder} required={required} autoComplete={autoComplete}
    aria-invalid={error ? true : undefined}
    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
  />
  {error
    ? <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-500">{error}</p>
    : hint ? <p id={`${id}-hint`} className="mt-1 text-sm text-ink/60">{hint}</p>
    : null}
</div>
```

---

### `molecules/SocialButtons/SocialButtons.jsx`

Botões Google + GitHub.

**Props**: `onGoogleClick`, `onGitHubClick`.

```jsx
<div className="flex flex-col gap-3">
  <Button variant="secondary" onClick={onGoogleClick} fullWidth>
    <Icon name="google" alt="Ícone do Google" /> Continuar com Google
  </Button>
  <Button variant="secondary" onClick={onGitHubClick} fullWidth>
    <Icon name="github" alt="Ícone do GitHub" /> Continuar com GitHub
  </Button>
</div>
```

---

## Organism

### `organisms/AuthForm/AuthForm.jsx`

**Organismo dirigido por config `fields`** — não conhece "login". Guarda o estado interno dos campos (keyed por `name`) + `rememberMe`, valida no submit.

**Props**

| Prop | Tipo | Descrição |
|---|---|---|
| `fields` | `array` | `[{ id, name, label, type, placeholder, required, autoComplete }]` — a lista de campos |
| `title` | `string` | Título do formulário (ex.: "Bem-vindo de volta") |
| `subtitle` | `string` | Subtítulo |
| `submitLabel` | `string` | Rótulo do botão submit (ex.: "Entrar") |
| `onSubmit` | `(values) => void` | Chamado com `{ [name]: value, ... }` no submit válido |
| `showRememberMe` | `boolean` | `false` | Mostra checkbox "Lembrar de mim" |
| `footer` | `ReactNode` | `null` | Rodapé (ex.: link "Criar conta") |
| `showSocials` | `boolean` | `true` | Mostra divisor + SocialButtons |

**Renderiza**: `<Logo />`, título, subtítulo, um `FormField` por item de `fields`, `Checkbox` (se `showRememberMe`), `Button` submit ("Entrar", `type="submit"`), `TextDivider` "ou continuar com" + `SocialButtons` (se `showSocials`), `footer`.

**Validação (básica, por campo `required`)**:
- Campo `required` vazio → "Campo obrigatório"
- Campo `type="email"` inválido → "Informe um email válido"

**A11y**: `<form>` com `noValidate` + `onSubmit={e => { e.preventDefault(); ... }}`; erros renderizados por estado, sem tooltips do browser; cada `FormField` conecta `label`→`input` e `aria-describedby`→erro/hint.

---

## Template

### `templates/AuthLayout/AuthLayout.jsx`

**Ponto-chave de reuso.** Layout de autenticação em duas colunas.

**Props**: `banner` (ReactNode), `children` (ReactNode).

```jsx
<div className="grid min-h-screen lg:grid-cols-2">
  <div className="hidden lg:block">{banner}</div>
  <div className="flex items-center justify-center p-6 sm:p-10">
    <div className="w-full max-w-md">{children}</div>
  </div>
</div>
```

---

## Page

### `pages/LoginPage/LoginPage.jsx`

Compõe o template com o banner e o formulário. **Sem lógica própria.**

```jsx
<AuthLayout banner={<Banner src="/Banner.png" alt="Ilustração de acesso ao sistema" />}>
  <AuthForm
    title="Bem-vindo de volta"
    subtitle="Entre com sua conta para continuar"
    submitLabel="Entrar"
    showRememberMe
    fields={[
      { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', required: true, autoComplete: 'email' },
      { id: 'password', name: 'password', label: 'Senha', type: 'password', placeholder: '••••••••', required: true, autoComplete: 'current-password' },
    ]}
    footer={
      <p className="text-center text-sm">
        Novo aqui? <a href="#" className="text-[#aa3bff]">Criar conta</a>
      </p>
    }
    onSubmit={handleSubmit}
  />
</AuthLayout>
```

`handleSubmit` por enquanto apenas loga no console, pois não há integração com backend.

## Acessibilidade (contrato transversal)

- Todo input pareado com `<label>` visível via `htmlFor`/`id` (testado com `getByLabelText`).
- `FormField` define `aria-invalid` e `aria-describedby` apontando para `<p id="...-error">` / `<p id="...-hint">`.
- Todos os botões são `<button>` reais com `type` correto (`submit` no Entrar, `button` nos sociais), `disabled` e ring de `focus-visible`.
- Toda imagem com `alt` significativo (`Logo`, `Banner`, ícones Google/GitHub).
- Submit com `e.preventDefault()`; validação via `required` + `noValidate` (erros renderizados por estado).
