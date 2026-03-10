import React from 'react'
import { Link } from 'react-router-dom'

function Button({ to, children, variant = 'primary', icon }) {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:shadow-md',
    accent: 'bg-violet-500 hover:bg-violet-600 text-white shadow-sm hover:shadow-md',
    outline: 'bg-white border border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 shadow-sm',
  }

  return (
    <Link
      to={to}
      className={`group flex items-center justify-center gap-2 w-full text-center font-semibold py-3 px-5 rounded-xl transition-all duration-200 no-underline active:scale-[0.98] ${variants[variant]}`}
    >
      {icon && <span className="text-base group-hover:scale-110 transition-transform duration-200">{icon}</span>}
      {children}
    </Link>
  )
}

export default Button