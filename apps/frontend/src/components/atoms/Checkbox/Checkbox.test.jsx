import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renderiza o label ligado ao input', () => {
    render(<Checkbox id="remember" name="remember" label="Lembrar de mim" onChange={() => {}} />)
    expect(screen.getByLabelText('Lembrar de mim')).toBeInTheDocument()
  })

  it('reflete o estado checked', () => {
    render(<Checkbox id="remember" name="remember" label="Lembrar de mim" checked onChange={() => {}} />)
    expect(screen.getByLabelText('Lembrar de mim')).toBeChecked()
  })

  it('chama onChange ao clicar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox id="remember" name="remember" label="Lembrar de mim" onChange={onChange} />)
    await user.click(screen.getByLabelText('Lembrar de mim'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
