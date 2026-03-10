import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', age: '', password: '', confirmPassword: '', userType: ''
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
    setError(''); setSuccess('')
    if (!formData.fullName || !formData.email || !formData.age || !formData.password || !formData.confirmPassword) { setError('Please fill in all fields'); return }
    if (isNaN(formData.age) || formData.age < 5 || formData.age > 120) { setError('Please enter a valid age'); return }
    if (!formData.userType) { setError('Please select your user type'); return }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return }

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: formData.fullName, email: formData.email, age: parseInt(formData.age), password: formData.password, userType: formData.userType })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) { setError(data.error); return }
        setSuccess('Account created successfully! Redirecting...')
        setTimeout(() => navigate('/login'), 2000)
      })
      .catch(() => setError('Server error. Please try again.'))
  }

  const inputClass = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white"

  const userTypes = [
    { value: 'deaf', label: 'Deaf', desc: 'Hearing loss' },
    { value: 'dumb', label: 'Mute', desc: 'Speech impairment' },
    { value: 'visionLoss', label: 'Vision Loss', desc: 'Visual impairment' },
  ]

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8 px-4 animate-fade-in">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Create an account</h2>
          <p className="mt-1 text-slate-400 text-sm">Join your sign language learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card border border-slate-100 p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span>{success}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="25" min="5" max="120" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">I am:</label>
            <div className="grid grid-cols-3 gap-2">
              {userTypes.map(type => (
                <label key={type.value} className={`flex flex-col items-center p-3 border rounded-xl cursor-pointer transition-all text-center ${formData.userType === type.value ? 'border-brand-400 bg-brand-50 ring-1 ring-brand-200' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                  <input type="radio" name="userType" value={type.value} checked={formData.userType === type.value} onChange={handleChange} className="sr-only" />
                  <span className={`text-xs font-semibold ${formData.userType === type.value ? 'text-brand-700' : 'text-slate-700'}`}>{type.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{type.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={inputClass} />
          </div>

          <label className="flex items-start cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded text-brand-600 cursor-pointer mt-0.5" />
            <span className="ml-2 text-xs text-slate-500">I agree to the <Link to="#" className="font-medium text-brand-600 hover:text-brand-700">Terms & Conditions</Link></span>
          </label>

          <button type="submit" disabled={!!success} className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-2.5 rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all text-sm border-none cursor-pointer active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm">
            {success ? 'Redirecting...' : 'Create Account'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#faf9fc] text-slate-400">Or</span></div>
        </div>

        <p className="text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
