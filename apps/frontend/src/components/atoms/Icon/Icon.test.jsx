import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Icon from './Icon'

describe('Icon', () => {
  it('renderiza o src do Google', () => {
    render(<Icon name="google" alt="Ícone do Google" />)
    expect(screen.getByAltText('Ícone do Google')).toHaveAttribute('src', '/Google.png')
  })

  it('renderiza o src do GitHub', () => {
    render(<Icon name="github" alt="Ícone do GitHub" />)
    expect(screen.getByAltText('Ícone do GitHub')).toHaveAttribute('src', '/GitHub.png')
  })

  it('aplica o tamanho informado', () => {
    render(<Icon name="google" alt="Ícone do Google" size={24} />)
    const img = screen.getByAltText('Ícone do Google')
    expect(img).toHaveAttribute('width', '24')
    expect(img).toHaveAttribute('height', '24')
  })

  it('exige alt para acessibilidade', () => {
    render(<Icon name="google" alt="Ícone do Google" />)
    expect(screen.getByAltText('Ícone do Google')).toHaveAccessibleName('Ícone do Google')
  })
})
