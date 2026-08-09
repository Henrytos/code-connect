import { useState } from 'react'
import Button from '../../atoms/Button/Button.jsx'
import Checkbox from '../../atoms/Checkbox/Checkbox.jsx'
import FormField from '../../molecules/FormField/FormField.jsx'
import SocialButtons from '../../molecules/SocialButtons/SocialButtons.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function AuthForm({
  fields,
  title,
  subtitle,
  submitLabel,
  onSubmit,
  showRememberMe = false,
  showSocials = true,
  footer = null,
  forgotPasswordHref = null,
  forgotPasswordLabel = 'Esqueci minha senha',
  secureNote = null,
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((field) => [field.name, ''])),
  )
  const [errors, setErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field.name]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    fields.forEach((field) => {
      const value = values[field.name] ?? ''
      if (field.required && !value.trim()) {
        nextErrors[field.name] = 'Campo obrigatório'
      } else if (field.type === 'email' && value && !EMAIL_RE.test(value)) {
        nextErrors[field.name] = 'Informe um email válido'
      }
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate()) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="text-2xl font-semibold text-form">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-form-muted">{subtitle}</p>}

      <div className="mt-6 flex flex-col gap-5">
        {fields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={values[field.name] ?? ''}
            onChange={handleChange(field)}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete}
            error={errors[field.name]}
          />
        ))}
      </div>

      {(showRememberMe || forgotPasswordHref) && (
        <div className="mt-4 flex items-center justify-between gap-2">
          {showRememberMe && (
            <Checkbox
              id="remember"
              name="remember"
              label="Lembrar de mim"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
          )}
          {forgotPasswordHref && (
            <a
              href={forgotPasswordHref}
              className="ml-auto text-sm font-medium text-accent hover:underline"
            >
              {forgotPasswordLabel}
            </a>
          )}
        </div>
      )}

      <Button type="submit" fullWidth className="mt-6">
        {submitLabel}
      </Button>

      {showSocials && (
        <>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-input/50" />
            <span className="text-sm text-form-muted">ou</span>
            <span className="h-px flex-1 bg-input/50" />
          </div>
          {secureNote && (
            <p className="mb-6 flex items-center justify-center gap-2 text-sm text-form-muted">
              <span aria-hidden>🔒</span>
              {secureNote}
            </p>
          )}
          <SocialButtons onGoogleClick={() => {}} onGitHubClick={() => {}} />
        </>
      )}

      {footer && <div className="mt-6">{footer}</div>}
    </form>
  )
}

export default AuthForm
