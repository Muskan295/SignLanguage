import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
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
      className={`relative px-4 py-2 text-base font-medium transition-all duration-200 no-underline ${
        isActive(path)
          ? 'text-brand-600'
          : 'text-slate-600 hover:text-brand-600'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline group">
            <span className="text-slate-800 font-bold text-2xl">SignSetu</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLink('/', 'Home')}
            {navLink('/alphabet', 'Alphabet')}
            {navLink('/words', 'Words')}
            {navLink('/quiz', 'Quiz')}
            {navLink('/modules', 'Modules')}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Auth Section */}
            {user ? (
              // Logged in - show user dropdown
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors border-none cursor-pointer font-medium text-sm"
                >
                  <div className="w-6 h-6 bg-white text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      {user.userType && (
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                          <span className="capitalize">
                            {user.userType === 'visionLoss' ? 'Vision Loss' : user.userType}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in - show login/signin buttons
              <div className="hidden sm:flex items-center space-x-1">
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 no-underline border border-slate-200 rounded-full hover:border-brand-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signin"
                  className="px-5 py-2 rounded-full bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors no-underline"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-slate-100 mt-2">
            {[['/', 'Home'], ['/alphabet', 'Alphabet'], ['/words', 'Words'], ['/quiz', 'Quiz'], ['/modules', 'Modules']].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                  isActive(path)
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}
            {/* Mobile Auth Links */}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors no-underline"
                >
                  Login
                </Link>
                <Link
                  to="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-md transition-shadow no-underline"
                >
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={() => {
                  handleLogout()
                  setMobileOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
