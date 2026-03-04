import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import AlphabetCard from '../components/AlphabetCard'
import WordCard from '../components/WordCard'
import QuizCard from '../components/QuizCard'
import { alphabetData } from '../data/alphabet'
import { wordsData } from '../data/words'

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
    <div className="space-y-8">
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

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Alphabet + Quiz Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Alphabet Preview */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg">Learn the Alphabet</h2>
                    <p className="text-xs text-slate-400 mt-0.5">A - Z in sign language</p>
                  </div>
                  <Link to="/alphabet" className="text-brand-600 text-sm font-medium hover:text-brand-700 no-underline flex items-center gap-1">
                    View all
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
                <div className="p-5 bg-slate-50/50">
                  <div className="grid grid-cols-3 gap-3">
                    {alphabetData.slice(0, 3).map((item) => (
                      <AlphabetCard key={item.letter} letter={item.letter} image={item.image} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Quick Quiz</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Test yourself</p>
                  </div>
                  <Link to="/quiz" className="text-brand-600 text-xs font-medium hover:text-brand-700 no-underline">
                    Full quiz →
                  </Link>
                </div>
                <div className="p-3">
                  <QuizCard compact={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Common Words */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Common Words</h2>
                <p className="text-xs text-slate-400 mt-0.5">Essential phrases to get started</p>
              </div>
              <Link to="/words" className="text-brand-600 text-sm font-medium hover:text-brand-700 no-underline flex items-center gap-1">
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="p-5 bg-slate-50/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {wordsData.slice(0, 6).map((item) => (
                  <WordCard key={item.word} word={item.word} image={item.image} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
