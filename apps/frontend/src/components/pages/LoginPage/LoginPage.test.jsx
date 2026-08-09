import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('renderiza o layout completo do login', () => {
    render(<LoginPage />)
    expect(screen.getByAltText('Ilustração de acesso ao sistema')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Criar conta/i })).toBeInTheDocument()
  })

  it('mostra o link Esqueci minha senha', () => {
    render(<LoginPage />)
    expect(screen.getByRole('link', { name: 'Esqueci minha senha' })).toBeInTheDocument()
  })

  it('chama onSubmit com os valores preenchidos', async () => {
    const user = userEvent.setup()
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<LoginPage />)
    await user.type(screen.getByLabelText('Email'), 'ana@exemplo.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(spy).toHaveBeenCalledWith('Login submit', { email: 'ana@exemplo.com', password: '123456' })
    spy.mockRestore()
  })
})
