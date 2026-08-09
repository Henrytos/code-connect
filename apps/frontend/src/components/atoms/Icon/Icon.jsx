const SRC = {
  google: '/Google.png',
  github: '/GitHub.png',
}

function Icon({ name, size = 20, alt }) {
  return (
    <img
      src={SRC[name]}
      alt={alt}
      width={size}
      height={size}
      className="h-auto shrink-0"
    />
  )
}

export default Icon
