import Button from '../../atoms/Button/Button.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'

// Social login rendered as side-by-side outlined buttons with icon + label
// (the mockup shows two social entry points side by side at the bottom)
function SocialButtons({ onGoogleClick, onGitHubClick }) {
  return (
    <div className="flex gap-24">
      <Button variant="secondary" onClick={onGoogleClick} fullWidth>
        <Icon name="google" alt="Ícone do Google" />
        Google
      </Button>
      <Button variant="secondary" onClick={onGitHubClick} fullWidth>
        <Icon name="github" alt="Ícone do GitHub" />
        GitHub
      </Button>
    </div>
  )
}

export default SocialButtons
