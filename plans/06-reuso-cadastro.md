# 06 — Contrato de Reuso: futura tela de Cadastro

A tela de cadastro é **idêntica ao layout do login**, mudando apenas:
1. **Imagem do banner** (`bannerSrc`)
2. **Inputs do formulário** (mais campos, ex.: nome, confirmar senha)

Nenhum código de cadastro será escrito agora — este documento define o **contrato** que garante o reuso.

## Como o Cadastro consumirá os componentes

```jsx
// pages/SignUpPage/SignUpPage.jsx  (futuro)
<AuthLayout banner={<Banner src="/Banner-cadastro.png" alt="Ilustração de cadastro" />}>
  <AuthForm
    title="Criar conta"
    subtitle="Preencha seus dados para começar"
    submitLabel="Criar conta"
    fields={[
      { id: 'name', name: 'name', label: 'Nome', type: 'text', placeholder: 'Seu nome', required: true, autoComplete: 'name' },
      { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', required: true, autoComplete: 'email' },
      { id: 'password', name: 'password', label: 'Senha', type: 'password', placeholder: '••••••••', required: true, autoComplete: 'new-password' },
      { id: 'confirmPassword', name: 'confirmPassword', label: 'Confirmar senha', type: 'password', placeholder: '••••••••', required: true, autoComplete: 'new-password' },
    ]}
    footer={<p className="text-center text-sm">Já tem uma conta? <a href="#">Entrar</a></p>}
    onSubmit={handleSubmit}
  />
</AuthLayout>
```

O Cadastro exigirá apenas: um novo `fields` config, um novo `SignUpPage` e outro `Banner` — **nenhum atom/molecule/template/organism precisa mudar**.

## O que garante o reuso (regras de design)

| Componente | Regra |
|---|---|
| `AuthForm` | É **dirigido por config `fields`** — o Cadastro passa uma lista diferente de campos. Não contém textos fixos de login |
| `FormField` | Genérico — labels via props; usado por login e cadastro |
| `AuthLayout` | Slots `banner` + `children` — nunca importa `AuthForm`/`LoginForm` internamente |
| `Button`, `Input`, `Checkbox`, `Icon`, `Logo`, `Banner`, `SocialButtons` | Sem acoplamento a login; rótulos via `children`/props |
| `LoginPage` | Específico do login — substituído pelo `SignUpPage` futuro |

## Componentes exclusivos do Login (não reutilizados)

| Componente | Por quê |
|---|---|
| `LoginPage` | Página do login (config + banner do login) |
| `AuthForm` (instância do login) | A instância é do login; o **componente** `AuthForm` é reutilizado pelo cadastro |

## Resumo do acoplamento

```
AuthLayout (reutilizável) ── slots ──> banner (ReactNode), children (ReactNode)
    ▲
    ├── LoginPage  → AuthLayout + <Banner src="/Banner.png"> + <AuthForm fields={login}>
    └── SignUpPage → AuthLayout + <Banner src="/Banner-cadastro.png"> + <AuthForm fields={cadastro}>  (futuro)

AuthForm (reutilizável, config-driven) ── fields ──> FormField (reutilizável)
```

**Resultado**: para criar a tela de cadastro bastará criar `SignUpPage` (page) com uma nova config `fields` e outro `Banner` — sem refatorar nenhum componente existente.
