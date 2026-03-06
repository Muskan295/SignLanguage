import React from 'react'
import { Link } from 'react-router-dom'

function Button({ to, children, variant = 'primary', icon }) {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-sm hover:shadow-md',
    accent: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-sm hover:shadow-md',
    outline: 'bg-white border-2 border-brand-500 text-brand-600 hover:bg-brand-50 hover:border-brand-600',
  }

  return (
    <Link
      to={to}
      className={`flex items-center justify-center gap-2 w-full text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 no-underline ${variants[variant]}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Link>
  )
}

export default Button