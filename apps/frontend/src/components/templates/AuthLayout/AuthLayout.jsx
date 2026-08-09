function AuthLayout({ banner, children, logo = null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-4 sm:p-8">
      <div className="w-full max-w-250 overflow-hidden rounded-2xl bg-panel shadow-2xl lg:grid lg:grid-cols-2">
        {/* Left: banner artwork with brand logo overlaid bottom-left (hidden below lg) */}
        <div className="relative hidden lg:block">
          {banner}
          {logo && <div className="absolute bottom-6 left-6">{logo}</div>}
        </div>
        {/* Right: form column */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-14 lg:py-16">
          {logo && <div className="mb-6 lg:hidden">{logo}</div>}
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
