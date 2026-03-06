import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Welcome Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-8 h-full flex flex-col justify-center border border-slate-100/80">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-brand-100 text-brand-700 text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-sm">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse-soft"></span>
                Interactive Learning
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
                {user ? (
                  <>
                    Welcome back,<br />
                    <span className="text-gradient">{(user.fullName || user.name || '').split(' ')[0]}!</span>
                  </>
                ) : (
                  <>
                    Learn Sign<br />
                    Language with<br />
                    <span className="text-gradient">SignSetu</span>
                  </>
                )}
              </h1>
              {user && user.userType && (
                <div className="mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-brand-100 text-brand-700 text-sm font-medium px-4 py-2 rounded-xl border border-brand-200/60 shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{getUserTypeLabel(user.userType)}</span>
                </div>
              )}
              <p className="text-slate-500 text-base leading-relaxed">
                Master sign language through interactive lessons, visual alphabet cards, and engaging quizzes.
              </p>
            </div>
            <div className="space-y-3">
              <Button to="/alphabet" variant="primary" icon="🤟">Learn Alphabet</Button>
              <Button to="/words" variant="secondary" icon="📝">Learn Words</Button>
              <Button to="/quiz" variant="accent" icon="🎯">Start Quiz</Button>
            </div>
          </div>
        </div>

        {/* Right Side - Image Cards */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center gap-4 relative py-4">
          {/* Top Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-3 shadow-lg border border-white/80 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 animate-float">
            <img 
              src="/images/thankyou-hands.png" 
              alt="Thank You in sign language" 
              className="w-80 lg:w-[420px] h-36 lg:h-48 object-contain"
            />
          </div>
          
          {/* Bottom Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-3 shadow-lg border border-white/80 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 animate-float-delayed">
            <img 
              src="/images/alphabet-hands.png" 
              alt="Alphabet signs" 
              className="w-96 lg:w-[470px] h-40 lg:h-56 object-contain"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 right-4 text-brand-400 text-xl animate-float-slow">✦</div>
          <div className="absolute top-1/3 -right-2 text-brand-300 text-2xl animate-float">✦</div>
          <div className="absolute bottom-4 right-16 text-brand-400 text-sm animate-float-delayed">✦</div>
          <div className="absolute top-1/4 -left-2 text-brand-200 text-lg animate-float-slow">✦</div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Letters', value: '26', icon: '🔤', color: 'from-brand-500 to-brand-600' },
          { label: 'Words', value: '50+', icon: '📝', color: 'from-amber-500 to-orange-500' },
          { label: 'Quizzes', value: '10+', icon: '🎯', color: 'from-emerald-500 to-teal-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-100/80 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center">
            <div className={`inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white text-xl mb-3 shadow-md`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { to: '/alphabet', img: '/images/alphabet-icon.png', title: 'Learn the Alphabet', desc: 'Master A-Z hand signs', gradient: 'from-brand-500/10 to-brand-600/5' },
          { to: '/words', img: '/images/words-icon.png', title: 'Practice Words', desc: 'Learn common phrases', gradient: 'from-amber-500/10 to-orange-500/5' },
          { to: '/quiz', img: '/images/quiz-icon.png', title: 'Take a Quiz', desc: 'Test your knowledge', gradient: 'from-emerald-500/10 to-teal-500/5' },
        ].map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={`group bg-gradient-to-br ${card.gradient} bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100/80 p-7 hover:shadow-card-hover hover:border-brand-300 hover:-translate-y-2 transition-all duration-500 no-underline text-center`}
          >
            <div className="w-24 h-24 mx-auto mb-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
              <img src={card.img} alt={card.title} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1.5 group-hover:text-brand-700 transition-colors">{card.title}</h3>
            <p className="text-slate-500 text-sm">{card.desc}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-brand-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              Get started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Continue Where You Left Off */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100/80 p-7 shadow-card">
        <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          Continue where you left off
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-slate-600 text-sm font-medium">Lesson 2 of 5</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full transition-all duration-1000 shadow-sm" style={{ width: '40%' }}></div>
            </div>
          </div>
          <Link
            to="/alphabet"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-glow transition-all duration-300 no-underline whitespace-nowrap hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Resume Learning
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
