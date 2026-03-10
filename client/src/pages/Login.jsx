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

  const inputClass = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white"

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8 px-4 animate-fade-in">
      <div className="w-full max-w-sm space-y-6">
        {showChangePassword ? (
          <>
            <div className="text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
              <p className="mt-1 text-slate-400 text-sm">Update your account password</p>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="bg-white rounded-xl shadow-card border border-slate-100 p-6 space-y-4">
              {changePasswordError && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg text-sm">{changePasswordError}</div>
              )}
              {changePasswordSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-2 rounded-lg text-sm">✓ {changePasswordSuccess}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input type="email" name="email" value={changePasswordData.email} onChange={handleChangePasswordChange} placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                <input type="password" name="oldPassword" value={changePasswordData.oldPassword} onChange={handleChangePasswordChange} placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <input type="password" name="newPassword" value={changePasswordData.newPassword} onChange={handleChangePasswordChange} placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                <input type="password" name="confirmPassword" value={changePasswordData.confirmPassword} onChange={handleChangePasswordChange} placeholder="••••••••" className={inputClass} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="flex-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-2.5 rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all text-sm border-none cursor-pointer shadow-sm">
                  Update Password
                </button>
                <button type="button" onClick={() => setShowChangePassword(false)} className="flex-1 bg-slate-100 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-200 transition-colors text-sm border-none cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Welcome back</h2>
              <p className="mt-1 text-slate-400 text-sm">Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card border border-slate-100 p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg text-sm">{error}</div>
              )}
              <div className="bg-brand-50 border border-brand-100 text-brand-700 px-3 py-2 rounded-lg text-xs">
                <strong>First time?</strong> <Link to="/signin" className="font-semibold text-brand-700 underline">Create an account</Link> before signing in.
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={inputClass} />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded text-brand-600 cursor-pointer" />
                  <span className="ml-2 text-xs text-slate-500">Remember me</span>
                </label>
                <button type="button" onClick={handleChangePasswordClick} className="text-xs font-medium text-brand-600 hover:text-brand-700 border-none bg-transparent cursor-pointer">
                  Change password?
                </button>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-2.5 rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all text-sm border-none cursor-pointer active:scale-[0.98] shadow-sm">
                Sign In
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#faf9fc] text-slate-400">Or</span></div>
            </div>

            <p className="text-center text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link to="/signin" className="font-semibold text-brand-600 hover:text-brand-700">Sign up now</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
