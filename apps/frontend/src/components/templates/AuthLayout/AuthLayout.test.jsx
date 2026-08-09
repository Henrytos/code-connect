import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AuthLayout from './AuthLayout'

describe('AuthLayout', () => {
  it('renderiza o slot banner', () => {
    render(
      <AuthLayout banner={<img src="/Banner.png" alt="Ilustração" />}>
        <p>Formulário</p>
      </AuthLayout>,
    )
    expect(screen.getByAltText('Ilustração')).toBeInTheDocument()
  })

  it('renderiza o slot children', () => {
    render(
      <AuthLayout banner={<img src="/Banner.png" alt="Ilustração" />}>
        <p>Formulário</p>
      </AuthLayout>,
    )
    expect(screen.getByText('Formulário')).toBeInTheDocument()
  })

  it('renderiza o logo no layout', () => {
    render(
      <AuthLayout banner={<img src="/Banner.png" alt="Ilustração" />} logo={<img src="/Logo.png" alt="Logo do sistema" />}>
        <p>Formulário</p>
      </AuthLayout>,
    )
    // O logo aparece no painel esquerdo (desktop) e no topo do formulário (mobile)
    expect(screen.getAllByAltText('Logo do sistema').length).toBeGreaterThan(0)
  })
})
