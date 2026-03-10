import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const getUserTypeLabel = (userType) => {
    if (userType === 'visionLoss') return 'Vision Loss'
    return userType.charAt(0).toUpperCase() + userType.slice(1)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ===== PARALLAX HERO SECTION (Full Width) ===== */}
      <div className="parallax-container rounded-2xl shadow-card-hover overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]">
        {/* Parallax Background Image */}
        <div
          className="parallax-bg"
          style={{ backgroundImage: 'url(/images/parallax-hero.png)' }}
        ></div>
        {/* Purple Gradient Overlay */}
        <div className="parallax-overlay"></div>
        {/* Content */}
        <div className="parallax-content px-8 py-16 lg:px-16 lg:py-24">
          <div className="max-w-2xl">
            {user && user.userType && (
              <div className="mb-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20 w-fit">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                {getUserTypeLabel(user.userType)}
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              {user ? (
                <>
                  Welcome back,{' '}
                  <span className="text-brand-200">{(user.fullName || user.name || '').split(' ')[0]}!</span>
                </>
              ) : (
                <>
                  Learn Sign Language{' '}
                  <br />
                  <span className="text-brand-200">the Smart Way</span>
                </>
              )}
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
              Master Indian Sign Language with interactive modules, visual alphabet cards, vocabulary practice, and engaging quizzes designed for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/alphabet" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all no-underline shadow-lg hover:shadow-xl active:scale-[0.98]">
                <span>🤟</span> Start Learning
              </Link>
              <Link to="/modules" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-all no-underline">
                <span>📚</span> Explore Modules
              </Link>
            </div>
          </div>

          {/* Stats on the right */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { icon: '🤟', label: 'Alphabet', value: '26 Letters' },
              { icon: '📝', label: 'Words', value: 'Common Signs' },
              { icon: '🎯', label: 'Quizzes', value: 'Test Skills' },
              { icon: '📚', label: 'Modules', value: 'Structured' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 text-center min-w-[100px]">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-white text-xs font-semibold">{stat.label}</p>
                <p className="text-white/50 text-[10px]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/alphabet"
          className="group bg-white rounded-xl border border-slate-100 p-6 hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 no-underline"
        >
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-200">
            🤟
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1.5">Learn the Alphabet</h3>
          <p className="text-slate-400 text-sm">Practice all 26 letters in sign language with visual cards.</p>
        </Link>

        <Link
          to="/words"
          className="group bg-white rounded-xl border border-slate-100 p-6 hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 no-underline"
        >
          <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-violet-100 transition-all duration-200">
            📝
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1.5">Practice Words</h3>
          <p className="text-slate-400 text-sm">Learn essential words and common phrases used daily.</p>
        </Link>

        <Link
          to="/quiz"
          className="group bg-white rounded-xl border border-slate-100 p-6 hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 no-underline"
        >
          <div className="w-12 h-12 bg-fuchsia-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-fuchsia-100 transition-all duration-200">
            🎯
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1.5">Take a Quiz</h3>
          <p className="text-slate-400 text-sm">Test your knowledge with interactive quiz questions.</p>
        </Link>
      </div>

      {/* Continue Where You Left Off */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <h2 className="text-base font-bold text-slate-800 mb-3">Continue where you left off</h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-slate-500 text-xs font-medium">Lesson 2 of 5</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
            </div>
          </div>
          <Link
            to="/alphabet"
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 no-underline whitespace-nowrap shadow-sm"
          >
            Resume Learning →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home