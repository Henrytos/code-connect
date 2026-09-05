const VARIANTS = {
  // Bright green fill with dark-teal text — the mockup's main CTA
  primary:
    'bg-brand text-input-text hover:bg-brand/90',
  // Grey-bordered transparent box — the mockup's social buttons
  secondary:
    'border border-input/50 bg-transparent text-form hover:bg-input/10',
  // Bare link-style action
  ghost:
    'text-brand hover:bg-brand/10',
}

const SIZES = {
  md: 'px-4 py-2.5 text-body-15',
  lg: 'px-5 py-3 text-body-18',
}

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium font-prompt',
    'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default Button
