import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignIn() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    userType: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!formData.fullName || !formData.email || !formData.age || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (isNaN(formData.age) || formData.age < 5 || formData.age > 120) {
      setError('Please enter a valid age')
      return
    }
    if (!formData.userType) {
      setError('Please select your user type')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        age: parseInt(formData.age),
        password: formData.password,
        userType: formData.userType
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
          return
        }
        setSuccess('Account created successfully! Redirecting to sign in...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      })
      .catch(() => setError('Server error. Please try again.'))
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Create an account</h2>
          <p className="mt-2 text-slate-600">Join us on your sign language learning journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-8 space-y-6 border border-slate-100/80">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
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

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="25"
              min="5"
              max="120"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
          </div>

          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">I am:</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all bg-brand-50/30" style={{borderColor: formData.userType === 'deaf' ? '#10b981' : '#cbd5e1', backgroundColor: formData.userType === 'deaf' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(226, 232, 240, 0.3)'}}>
                <input
                  type="radio"
                  name="userType"
                  value="deaf"
                  checked={formData.userType === 'deaf'}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-600 cursor-pointer accent-brand-600"
                />
                <div className="ml-3">
                  <span className="text-sm font-medium text-slate-900">Deaf</span>
                  <p className="text-xs text-slate-600 mt-0.5">I have hearing loss</p>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all bg-brand-50/30" style={{borderColor: formData.userType === 'dumb' ? '#10b981' : '#cbd5e1', backgroundColor: formData.userType === 'dumb' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(226, 232, 240, 0.3)'}}>
                <input
                  type="radio"
                  name="userType"
                  value="dumb"
                  checked={formData.userType === 'dumb'}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-600 cursor-pointer accent-brand-600"
                />
                <div className="ml-3">
                  <span className="text-sm font-medium text-slate-900">Dumb</span>
                  <p className="text-xs text-slate-600 mt-0.5">I have speech loss</p>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all bg-brand-50/30" style={{borderColor: formData.userType === 'visionLoss' ? '#10b981' : '#cbd5e1', backgroundColor: formData.userType === 'visionLoss' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(226, 232, 240, 0.3)'}}>
                <input
                  type="radio"
                  name="userType"
                  value="visionLoss"
                  checked={formData.userType === 'visionLoss'}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-600 cursor-pointer accent-brand-600"
                />
                <div className="ml-3">
                  <span className="text-sm font-medium text-slate-900">Vision Loss</span>
                  <p className="text-xs text-slate-600 mt-0.5">I have visual impairment</p>
                </div>
              </label>
            </div>
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start">
            <input
              type="checkbox"
              className="w-4 h-4 border-slate-300 rounded text-brand-600 cursor-pointer mt-0.5"
            />
            <span className="ml-2 text-sm text-slate-600">
              I agree to the{' '}
              <Link to="#" className="font-medium text-brand-600 hover:text-brand-700">
                Terms &amp; Conditions
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={success}
            className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3 rounded-xl hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-[0.98] border-none cursor-pointer"
          >
            {success ? 'Redirecting...' : 'Create Account'}
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

        {/* Login Link */}
        <p className="text-center text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-xs text-blue-800">
          <p className="font-semibold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Process Overview
          </p>
          <ol className="space-y-1.5 list-decimal list-inside">
            <li><strong>Fill the form above</strong> with your details</li>
            <li><strong>After clicking "Create Account"</strong>, your account will be registered</li>
            <li><strong>You'll be redirected to Sign In</strong> page automatically</li>
            <li><strong>Sign in with your email and password</strong> to access the app</li>
            <li><strong>Your avatar will appear in navbar</strong> after successful login</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default SignIn
