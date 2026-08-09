import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('renderiza com placeholder e valor', () => {
    render(<Input placeholder="seu@email.com" value="ana@exemplo.com" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('seu@email.com')).toHaveValue('ana@exemplo.com')
  })

  it('chama onChange ao digitar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input placeholder="Email" onChange={onChange} />)
    await user.type(screen.getByPlaceholderText('Email'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('propaga props nativas (type, autoComplete, aria-label)', () => {
    render(
      <Input
        type="password"
        autoComplete="current-password"
        aria-label="Senha"
        onChange={() => {}}
      />,
    )
    const input = screen.getByLabelText('Senha')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('autoComplete', 'current-password')
  })

  it('aplica classe de erro e aria-invalid', () => {
    render(<Input error aria-invalid aria-label="Email" onChange={() => {}} />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveClass('border-red-400')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})
