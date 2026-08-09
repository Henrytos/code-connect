import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  it('renderiza a imagem do logo com nome acessível', () => {
    render(<Logo />)
    const img = screen.getByAltText('Logo do sistema')
    expect(img).toHaveAttribute('src', '/Logo.png')
  })
})
