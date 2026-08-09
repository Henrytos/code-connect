import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FormField from './FormField'

describe('FormField', () => {
  it('encontra o input pelo label (htmlFor ↔ id)', () => {
    render(<FormField id="email" label="Email" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })

  it('exibe o erro referenciado por aria-describedby', () => {
    render(
      <FormField
        id="email"
        label="Email"
        value=""
        onChange={() => {}}
        error="Campo obrigatório"
      />,
    )
    const input = screen.getByLabelText('Email')
    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('exibe o hint quando não há erro', () => {
    render(<FormField id="email" label="Email" value="" onChange={() => {}} hint="Usaremos apenas para login" />)
    expect(screen.getByText('Usaremos apenas para login')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'email-hint')
  })

  it('propaga required para o input', () => {
    render(<FormField id="email" label="Email" value="" onChange={() => {}} required />)
    expect(screen.getByLabelText('Email')).toBeRequired()
  })
})
