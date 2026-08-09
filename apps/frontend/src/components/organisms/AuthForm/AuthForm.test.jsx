import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthForm from './AuthForm'

const FIELDS = [
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

const defaultProps = {
  fields: FIELDS,
  title: 'Bem-vindo de volta',
  subtitle: 'Entre com sua conta para continuar',
  submitLabel: 'Entrar',
  onSubmit: vi.fn(),
}

describe('AuthForm', () => {
  it('renderiza título e subtítulo', () => {
    render(<AuthForm {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeInTheDocument()
    expect(screen.getByText('Entre com sua conta para continuar')).toBeInTheDocument()
  })

  it('renderiza um FormField por campo', () => {
    render(<AuthForm {...defaultProps} />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('atualiza o valor ao digitar', async () => {
    const user = userEvent.setup()
    render(<AuthForm {...defaultProps} />)
    await user.type(screen.getByLabelText('Email'), 'ana@exemplo.com')
    expect(screen.getByLabelText('Email')).toHaveValue('ana@exemplo.com')
  })

  it('chama onSubmit com os valores no submit válido', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AuthForm {...defaultProps} onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText('Email'), 'ana@exemplo.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(onSubmit).toHaveBeenCalledWith({ email: 'ana@exemplo.com', password: '123456' })
  })

  it('exibe erro de campo obrigatório e não chama onSubmit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AuthForm {...defaultProps} onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(screen.getAllByRole('alert').length).toBe(2)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('exibe erro de email inválido', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AuthForm {...defaultProps} onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText('Email'), 'invalido')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(screen.getByText('Informe um email válido')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('mostra o checkbox quando showRememberMe é true', () => {
    render(<AuthForm {...defaultProps} showRememberMe />)
    expect(screen.getByLabelText('Lembrar de mim')).toBeInTheDocument()
  })

  it('não mostra o checkbox quando showRememberMe é false', () => {
    render(<AuthForm {...defaultProps} />)
    expect(screen.queryByLabelText('Lembrar de mim')).not.toBeInTheDocument()
  })

  it('renderiza socials e footer', () => {
    render(
      <AuthForm
        {...defaultProps}
        footer={<p>Novo aqui? Criar conta</p>}
      />,
    )
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument()
    expect(screen.getByText(/Novo aqui/)).toBeInTheDocument()
  })

  it('não renderiza socials quando showSocials é false', () => {
    render(<AuthForm {...defaultProps} showSocials={false} />)
    expect(screen.queryByRole('button', { name: /Google/i })).not.toBeInTheDocument()
  })

  it('renderiza o link esqueci minha senha quando fornecido', () => {
    render(<AuthForm {...defaultProps} forgotPasswordHref="#" />)
    expect(screen.getByRole('link', { name: 'Esqueci minha senha' })).toBeInTheDocument()
  })
})
