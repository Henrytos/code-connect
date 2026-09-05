function AuthLayout({ banner, children, logo = null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-16 sm:p-24">
      <div className="w-full max-w-[648px] overflow-hidden rounded-4xl bg-panel shadow-2xl lg:max-w-[996px] lg:grid lg:grid-cols-2">
        {/* Left: banner artwork with brand logo overlaid bottom-left (hidden below lg) */}
        <div className="relative hidden lg:block">
          {banner}
          {logo && <div className="absolute bottom-16 left-16">{logo}</div>}
        </div>
        {/* Right: form column */}
        <div className="flex flex-col justify-center px-16 py-24 sm:px-14 lg:px-[78px] lg:py-[56px]">
          {logo && <div className="mb-24 lg:hidden">{logo}</div>}
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
