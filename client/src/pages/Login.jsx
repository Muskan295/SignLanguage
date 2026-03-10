import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showUpdateProfile, setShowUpdateProfile] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [changePasswordData, setChangePasswordData] = useState({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' })
  const [changePasswordError, setChangePasswordError] = useState('')
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('')
  const [updateProfileData, setUpdateProfileData] = useState({ fullName: '', age: '', userType: '' })
  const [updateProfileError, setUpdateProfileError] = useState('')
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState('')
  const [deleteAccountData, setDeleteAccountData] = useState({ password: '', confirmText: '' })
  const [deleteAccountError, setDeleteAccountError] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setLoggedInUser(JSON.parse(stored))
    }
  }, [])

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

  const handleUpdateProfileClick = () => {
    setShowUpdateProfile(true)
    setShowChangePassword(false)
    setShowDeleteAccount(false)
    setUpdateProfileError('')
    setUpdateProfileSuccess('')
    if (loggedInUser) {
      setUpdateProfileData({
        fullName: loggedInUser.fullName || '',
        age: loggedInUser.age || '',
        userType: loggedInUser.userType || ''
      })
    }
  }

  const handleUpdateProfileChange = (e) => {
    const { name, value } = e.target
    setUpdateProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfileSubmit = (e) => {
    e.preventDefault()
    setUpdateProfileError('')
    setUpdateProfileSuccess('')

    if (!updateProfileData.fullName || !updateProfileData.age) {
      setUpdateProfileError('Please fill in all fields')
      return
    }

    if (isNaN(updateProfileData.age) || updateProfileData.age < 5 || updateProfileData.age > 120) {
      setUpdateProfileError('Please enter a valid age (5-120)')
      return
    }

    fetch(`/api/auth/profile/${encodeURIComponent(loggedInUser.email)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: updateProfileData.fullName,
        age: parseInt(updateProfileData.age),
        userType: updateProfileData.userType
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setUpdateProfileError(data.error)
          return
        }
        const updatedUser = { ...loggedInUser, ...data.user }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setLoggedInUser(updatedUser)
        setUpdateProfileSuccess('Profile updated successfully!')
        setTimeout(() => {
          setShowUpdateProfile(false)
          setUpdateProfileSuccess('')
        }, 3000)
      })
      .catch(() => setUpdateProfileError('Server error. Please try again.'))
  }

  const handleDeleteAccountClick = () => {
    setShowDeleteAccount(true)
    setShowChangePassword(false)
    setShowUpdateProfile(false)
    setDeleteAccountError('')
    setDeleteAccountData({ password: '', confirmText: '' })
  }

  const handleDeleteAccountChange = (e) => {
    const { name, value } = e.target
    setDeleteAccountData(prev => ({ ...prev, [name]: value }))
  }

  const handleDeleteAccountSubmit = (e) => {
    e.preventDefault()
    setDeleteAccountError('')

    if (!deleteAccountData.password) {
      setDeleteAccountError('Please enter your password')
      return
    }

    if (deleteAccountData.confirmText !== 'DELETE') {
      setDeleteAccountError('Please type DELETE to confirm')
      return
    }

    fetch(`/api/auth/profile/${encodeURIComponent(loggedInUser.email)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: deleteAccountData.password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setDeleteAccountError(data.error)
          return
        }
        localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
      })
      .catch(() => setDeleteAccountError('Server error. Please try again.'))
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
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
            <form onSubmit={handleChangePasswordSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-8 space-y-6 border border-slate-100/80">
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
                  className="flex-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3 rounded-xl hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 hover:-translate-y-0.5 active:scale-[0.98] border-none cursor-pointer"
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
        ) : showUpdateProfile ? (
          <>
            {/* Update Profile Header */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Update Profile</h2>
              <p className="mt-2 text-slate-600">Edit your account details</p>
            </div>

            {/* Update Profile Form */}
            <form onSubmit={handleUpdateProfileSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-8 space-y-6 border border-slate-100/80">
              {updateProfileError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {updateProfileError}
                </div>
              )}

              {updateProfileSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  ✓ {updateProfileSuccess}
                </div>
              )}

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={loggedInUser?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-500 bg-slate-100 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={updateProfileData.fullName}
                  onChange={handleUpdateProfileChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={updateProfileData.age}
                  onChange={handleUpdateProfileChange}
                  placeholder="25"
                  min="5"
                  max="120"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">I am:</label>
                <div className="space-y-2">
                  {[
                    { value: 'deaf', label: 'Deaf', desc: 'I have hearing loss' },
                    { value: 'dumb', label: 'Dumb', desc: 'I have speech loss' },
                    { value: 'visionLoss', label: 'Vision Loss', desc: 'I have visual impairment' }
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center p-3 border-2 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all" style={{borderColor: updateProfileData.userType === opt.value ? '#10b981' : '#cbd5e1', backgroundColor: updateProfileData.userType === opt.value ? 'rgba(16, 185, 129, 0.1)' : 'rgba(226, 232, 240, 0.3)'}}>
                      <input
                        type="radio"
                        name="userType"
                        value={opt.value}
                        checked={updateProfileData.userType === opt.value}
                        onChange={handleUpdateProfileChange}
                        className="w-4 h-4 text-brand-600 cursor-pointer accent-brand-600"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-slate-900">{opt.label}</span>
                        <p className="text-xs text-slate-600 mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3 rounded-xl hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 hover:-translate-y-0.5 active:scale-[0.98] border-none cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateProfile(false)}
                  className="flex-1 bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg hover:bg-slate-300 transition-all duration-200 focus:outline-none border-none cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <p className="text-center text-slate-600">
              <button
                onClick={() => setShowUpdateProfile(false)}
                className="font-semibold text-brand-600 hover:text-brand-700 border-none bg-transparent cursor-pointer"
              >
                Back to Login
              </button>
            </p>
          </>
        ) : showDeleteAccount ? (
          <>
            {/* Delete Account Header */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-red-600">Delete Account</h2>
              <p className="mt-2 text-slate-600">This action cannot be undone</p>
            </div>

            {/* Delete Account Form */}
            <form onSubmit={handleDeleteAccountSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-8 space-y-6 border border-red-100/80">
              {deleteAccountError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {deleteAccountError}
                </div>
              )}

              {/* Warning Box */}
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                <p className="font-semibold mb-1">Warning:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your account will be permanently deleted</li>
                  <li>All your data will be lost</li>
                  <li>This action cannot be reversed</li>
                </ul>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Account Email</label>
                <input
                  type="email"
                  value={loggedInUser?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-500 bg-slate-100 cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Enter Your Password</label>
                <input
                  type="password"
                  name="password"
                  value={deleteAccountData.password}
                  onChange={handleDeleteAccountChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Confirm Text */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Type <span className="text-red-600 font-bold">DELETE</span> to confirm</label>
                <input
                  type="text"
                  name="confirmText"
                  value={deleteAccountData.confirmText}
                  onChange={handleDeleteAccountChange}
                  placeholder="DELETE"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 hover:-translate-y-0.5 active:scale-[0.98] border-none cursor-pointer"
                >
                  Delete My Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteAccount(false)}
                  className="flex-1 bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg hover:bg-slate-300 transition-all duration-200 focus:outline-none border-none cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <p className="text-center text-slate-600">
              <button
                onClick={() => setShowDeleteAccount(false)}
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
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-8 space-y-6 border border-slate-100/80">
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
                className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3 rounded-xl hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 hover:-translate-y-0.5 active:scale-[0.98] border-none cursor-pointer"
              >
                Sign In
              </button>
            </form>

            {/* Account Management (visible when logged in) */}
            {loggedInUser && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-6 space-y-4 border border-slate-100/80">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Management
                </h3>
                <p className="text-sm text-slate-600">Logged in as <span className="font-semibold text-slate-800">{loggedInUser.fullName}</span> ({loggedInUser.email})</p>

                <div className="grid grid-cols-2 gap-3">
                  {/* Update Profile Button */}
                  <button
                    onClick={handleUpdateProfileClick}
                    className="flex items-center justify-center gap-2 bg-brand-50 text-brand-700 font-semibold py-3 px-4 rounded-xl border-2 border-brand-200 hover:bg-brand-100 hover:border-brand-300 transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update Profile
                  </button>

                  {/* Delete Account Button */}
                  <button
                    onClick={handleDeleteAccountClick}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-700 font-semibold py-3 px-4 rounded-xl border-2 border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
            )}

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
