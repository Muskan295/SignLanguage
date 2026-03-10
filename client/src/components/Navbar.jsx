import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setDropdownOpen(false)
    navigate('/')
    window.location.reload()
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isActive = (path) => location.pathname === path

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-200 no-underline rounded-lg ${
        isActive(path)
          ? 'text-brand-700 bg-brand-50'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center mr-2.5">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-slate-900 font-bold text-lg tracking-tight">Sign<span className="text-brand-600">Setu</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLink('/', 'Home')}
            {navLink('/alphabet', 'Alphabet')}
            {navLink('/words', 'Words')}
            {navLink('/quiz', 'Quiz')}
            {navLink('/modules', 'Modules')}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors border border-brand-100 cursor-pointer font-medium text-sm"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-md flex items-center justify-center text-xs font-bold">
                    {getInitials(user.fullName)}
                  </div>
                  <span className="hidden sm:inline text-sm">{user.fullName.split(' ')[0]}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-scale-in">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-sm font-semibold text-slate-900">{user.name || user.fullName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                      {user.userType && (
                        <span className="mt-2 inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium px-2 py-0.5 rounded-md">
                          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                          <span className="capitalize">
                            {user.userType === 'visionLoss' ? 'Vision Loss' : user.userType}
                          </span>
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer font-medium"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 no-underline rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signin"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:from-brand-600 hover:to-brand-700 transition-all no-underline shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-0.5 border-t border-slate-100 mt-1 animate-fade-in">
            {[['/', 'Home'], ['/alphabet', 'Alphabet'], ['/words', 'Words'], ['/quiz', 'Quiz'], ['/modules', 'Modules']].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  isActive(path)
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}
            {!user && (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors no-underline">
                  Log in
                </Link>
                <Link to="/signin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 transition-colors no-underline mt-1">
                  Sign up
                </Link>
              </>
            )}
            {user && (
              <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer">
                Sign out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
