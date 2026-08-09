const BASE =
  'w-full rounded-lg border border-input/50 bg-input text-input-text placeholder:text-input-text/50 ' +
  'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

function Input({ error = false, className = '', ...rest }) {
  return (
    <input
      className={`${BASE} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''} ${className}`}
      {...rest}
    />
  )
}

export default Input
