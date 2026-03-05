import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <div className="space-y-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Welcome Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-card p-8 h-full flex flex-col justify-center border border-slate-100">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                Interactive Learning
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
                {user ? (
                  <>
                    Welcome back,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">{user.name.split(' ')[0]}!</span>
                  </>
                ) : (
                  <>
                    Welcome to<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">SignLingo</span>
                  </>
                )}
              </h1>
              {user && user.userType && (
                <div className="mb-3 inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-brand-100 text-brand-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-brand-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>User Type: <strong>{getUserTypeLabel(user.userType)}</strong></span>
                </div>
              )}
              <p className="text-slate-500 text-sm leading-relaxed">
                Master sign language through interactive lessons, visual alphabet cards, and engaging quizzes.
              </p>
            </div>
            <div className="space-y-3">
              <Button to="/alphabet" variant="primary" icon="🤟">Learn Alphabet</Button>
              <Button to="/words" variant="secondary" icon="📝">Learn Words</Button>
              <Button to="/quiz" variant="accent" icon="🎯">Start Quiz</Button>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-brand-200 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-brand-300 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-brand-400 border-2 border-white"></div>
              </div>
              <span className="text-xs text-slate-400">
                Powered by <strong className="text-slate-600">Node.js & Express</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Image Cards */}
        <div className="flex-[1.2] flex flex-col items-center gap-2 relative">
          {/* Top Card - Thank You */}
          <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-3xl p-2 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
            <img 
              src="/images/thankyou-hands.png" 
              alt="Thank You in sign language" 
              className="w-80 lg:w-[400px] h-36 lg:h-44 object-contain"
            />
          </div>
          
          {/* Bottom Card - Alphabet & Friend */}
          <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-3xl p-2 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
            <img 
              src="/images/alphabet-hands.png" 
              alt="Alphabet signs" 
              className="w-96 lg:w-[450px] h-40 lg:h-52 object-contain"
            />
          </div>
          
          {/* Decorative stars */}
          <div className="absolute -top-4 right-0 text-brand-400 text-lg">✦</div>
          <div className="absolute top-1/2 -right-4 text-brand-300 text-xl">✦</div>
          <div className="absolute -bottom-2 right-10 text-brand-400 text-sm">✦</div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Learn the Alphabet Card */}
        <Link
          to="/alphabet"
          className="group bg-white rounded-2xl border-2 border-brand-200 p-6 hover:shadow-xl hover:border-brand-400 transition-all duration-300 no-underline text-center"
        >
          <div className="w-28 h-28 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/alphabet-icon.png" 
              alt="Learn Alphabet" 
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Learn the Alphabet</h3>
          <p className="text-slate-500 text-sm">Practice A-Z signs</p>
        </Link>

        {/* Practice Words Card */}
        <Link
          to="/words"
          className="group bg-white rounded-2xl border-2 border-brand-200 p-6 hover:shadow-xl hover:border-brand-400 transition-all duration-300 no-underline text-center"
        >
          <div className="w-28 h-28 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/words-icon.png" 
              alt="Practice Words" 
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Practice Words</h3>
          <p className="text-slate-500 text-sm">Learn common signs</p>
        </Link>

        {/* Take a Quiz Card */}
        <Link
          to="/quiz"
          className="group bg-white rounded-2xl border-2 border-brand-200 p-6 hover:shadow-xl hover:border-brand-400 transition-all duration-300 no-underline text-center"
        >
          <div className="w-36 h-36 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/quiz-icon.png" 
              alt="Take a Quiz" 
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Take a Quiz</h3>
          <p className="text-slate-500 text-sm">Test your knowledge</p>
        </Link>
      </div>

      {/* Continue Where You Left Off */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Continue where you left off</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-slate-600 text-sm font-medium">Lesson 2 of 5</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                <div className="w-2 h-2 rounded-full bg-brand-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-brand-400 to-brand-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          <Link
            to="/alphabet"
            className="inline-flex items-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 no-underline whitespace-nowrap"
          >
            Resume Learning
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
