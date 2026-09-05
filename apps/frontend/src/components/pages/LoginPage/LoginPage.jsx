import AuthLayout from '../../templates/AuthLayout/AuthLayout.jsx'
import Banner from '../../atoms/Banner/Banner.jsx'
import Logo from '../../atoms/Logo/Logo.jsx'
import AuthForm from '../../organisms/AuthForm/AuthForm.jsx'

const LOGIN_FIELDS = [
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
    required: true,
    autoComplete: 'email',
  },
  {
    id: 'password',
    name: 'password',
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    autoComplete: 'current-password',
  },
]

function LoginPage() {
  const handleSubmit = (values) => {
    // TODO: integração com o backend de autenticação
    console.log('Login submit', values)
  }

  return (
    <AuthLayout
      banner={<Banner src="/Banner.png" alt="Ilustração de acesso ao sistema" />}
      logo={<Logo className="h-auto w-32" />}
    >
      <AuthForm
        title="Bem-vindo de volta"
        subtitle="Entre com sua conta para continuar"
        submitLabel="Entrar"
        showRememberMe
        forgotPasswordHref="#"
        fields={LOGIN_FIELDS}
        footer={
          <p className="text-center text-body-15 text-form-muted font-prompt">
            Novo aqui?{' '}
            <a href="#" className="font-medium text-brand hover:underline font-prompt">
              Criar conta
            </a>
          </p>
        }
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  )
}

export default LoginPage
