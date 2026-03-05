import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [changePasswordData, setChangePasswordData] = useState({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' })
  const [changePasswordError, setChangePasswordError] = useState('')
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: formData.email, password: formData.password })
})
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      setError(data.error)
      return
    }
    localStorage.setItem('user', JSON.stringify(data.user))
    navigate('/')
    window.location.reload()
  })
  .catch(() => setError('Server error. Please try again.'))
  }

  const handleChangePasswordClick = () => {
    setShowChangePassword(true)
    setChangePasswordError('')
    setChangePasswordSuccess('')
    setChangePasswordData({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleChangePasswordChange = (e) => {
    const { name, value } = e.target
    setChangePasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault()
    setChangePasswordError('')
    setChangePasswordSuccess('')

    if (!changePasswordData.email || !changePasswordData.oldPassword || !changePasswordData.newPassword || !changePasswordData.confirmPassword) {
      setChangePasswordError('Please fill in all fields')
      return
    }

    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      setChangePasswordError('New passwords do not match')
      return
    }

    if (changePasswordData.newPassword.length < 6) {
      setChangePasswordError('New password must be at least 6 characters')
      return
    }

    if (changePasswordData.newPassword === changePasswordData.oldPassword) {
      setChangePasswordError('New password must be different from old password')
      return
    }

    fetch('/api/auth/change-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: changePasswordData.email,
        oldPassword: changePasswordData.oldPassword,
        newPassword: changePasswordData.newPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setChangePasswordError(data.error)
          return
        }
        setChangePasswordSuccess('Password changed successfully!')
        setChangePasswordData({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => {
          setShowChangePassword(false)
          setChangePasswordSuccess('')
        }, 3000)
      })
      .catch(() => setChangePasswordError('Server error. Please try again.'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {showChangePassword ? (
          <>
            {/* Change Password Header */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Change Password</h2>
              <p className="mt-2 text-slate-600">Update your account password</p>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handleChangePasswordSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-6 border border-slate-100">
              {changePasswordError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {changePasswordError}
                </div>
              )}

              {changePasswordSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  ✓ {changePasswordSuccess}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={changePasswordData.email}
                  onChange={handleChangePasswordChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Old Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={changePasswordData.oldPassword}
                  onChange={handleChangePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={changePasswordData.newPassword}
                  onChange={handleChangePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={changePasswordData.confirmPassword}
                  onChange={handleChangePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg hover:bg-slate-300 transition-all duration-200 focus:outline-none border-none cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <p className="text-center text-slate-600">
              <button
                onClick={() => setShowChangePassword(false)}
                className="font-semibold text-brand-600 hover:text-brand-700 border-none bg-transparent cursor-pointer"
              >
                Back to Login
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Login Header */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
              <p className="mt-2 text-slate-600">Sign in to continue your learning journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-6 border border-slate-100">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Info Box */}
              <div className="bg-brand-50 border border-brand-200 text-brand-800 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  <strong>First time?</strong> You need to <Link to="/signin" className="font-semibold text-brand-700 hover:text-brand-800 underline">create an account</Link> before signing in.
                </span>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Remember Me & Change Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-slate-300 rounded text-brand-600 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleChangePasswordClick}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700 border-none bg-transparent cursor-pointer"
                >
                  Change password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-50 text-slate-600">Or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-slate-600">
              Don't have an account?{' '}
              <Link to="/signin" className="font-semibold text-brand-600 hover:text-brand-700">
                Sign up now
              </Link>
            </p>

            {/* Demo Info */}
            <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg text-xs text-slate-600">
              <p className="font-semibold mb-2 text-slate-700">📝 Demo Instructions:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Click "Sign up now" to create your first account</li>
                <li>Fill in your details and select your user type</li>
                <li>After signup, you'll be automatically logged in</li>
                <li>Next time, use this page to sign in with your credentials</li>
                <li>Click "Change password?" to update your password anytime</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
