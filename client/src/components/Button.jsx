import React from 'react'
import { Link } from 'react-router-dom'

function Button({ to, children, variant = 'primary', icon }) {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-md hover:shadow-glow',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-md hover:shadow-lg',
    accent: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg',
    outline: 'bg-white border-2 border-brand-200 text-brand-600 hover:bg-brand-50 hover:border-brand-400 shadow-sm hover:shadow-md',
  }

  return (
    <Link
      to={to}
      className={`group flex items-center justify-center gap-2.5 w-full text-center font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 no-underline active:scale-[0.98] hover:-translate-y-0.5 ${variants[variant]}`}
    >
      {icon && <span className="text-lg group-hover:scale-110 transition-transform duration-300">{icon}</span>}
      {children}
    </Link>
  )
}

export default Button
