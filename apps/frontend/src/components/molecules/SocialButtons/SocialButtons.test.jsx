import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SocialButtons from './SocialButtons'

describe('SocialButtons', () => {
  it('renderiza Google e GitHub com nome acessível', () => {
    render(<SocialButtons onGoogleClick={() => {}} onGitHubClick={() => {}} />)
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument()
  })

  it('dispara onGoogleClick e onGitHubClick', async () => {
    const user = userEvent.setup()
    const onGoogleClick = vi.fn()
    const onGitHubClick = vi.fn()
    render(<SocialButtons onGoogleClick={onGoogleClick} onGitHubClick={onGitHubClick} />)
    await user.click(screen.getByRole('button', { name: /Google/i }))
    await user.click(screen.getByRole('button', { name: /GitHub/i }))
    expect(onGoogleClick).toHaveBeenCalledTimes(1)
    expect(onGitHubClick).toHaveBeenCalledTimes(1)
  })
})
