import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Banner from './Banner'

describe('Banner', () => {
  it('renderiza a imagem com src e alt', () => {
    render(<Banner src="/Banner.png" alt="Ilustração de acesso ao sistema" />)
    const img = screen.getByAltText('Ilustração de acesso ao sistema')
    expect(img).toHaveAttribute('src', '/Banner.png')
    expect(img).toHaveClass('object-cover')
  })
})
