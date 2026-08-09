import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renderiza o rótulo com o type padrão', () => {
    render(<Button>Entrar</Button>)
    const button = screen.getByRole('button', { name: 'Entrar' })
    expect(button).toHaveAttribute('type', 'button')
  })

  it('aplica o type submit quando informado', () => {
    render(<Button type="submit">Entrar</Button>)
    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveAttribute('type', 'submit')
  })

  it('aplica a classe da variante primária por padrão', () => {
    render(<Button>Entrar</Button>)
    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveClass('bg-brand')
  })

  it('aplica a classe da variante secundária', () => {
    render(<Button variant="secondary">Continuar</Button>)
    expect(screen.getByRole('button', { name: 'Continuar' })).toHaveClass('bg-transparent')
  })

  it('aplica w-full com fullWidth', () => {
    render(<Button fullWidth>Entrar</Button>)
    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveClass('w-full')
  })

  it('desabilitado não dispara onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Entrar</Button>)
    const button = screen.getByRole('button', { name: 'Entrar' })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('dispara onClick no clique', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Entrar</Button>)
    await user.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
