import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import QuizCard from '../components/QuizCard'

function Quiz() {
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    fetch('/api/quiz').then(res => res.json()).then(data => setQuizData(data))
  }, [])

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-lg mb-2">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse-soft"></span>
            Challenge Mode
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quiz <span className="text-gradient">Time</span></h1>
          <p className="text-slate-400 text-sm mt-1">Test your sign language knowledge</p>
        </div>
        <div className="bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-violet-100">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {quizData.length || 10} Questions
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <QuizCard compact={false} quizData={quizData} />
      </div>

      {/* Tip */}
      <div className="bg-brand-50 rounded-xl border border-brand-100 p-4">
        <div className="flex items-start gap-2.5">
          <div className="bg-white rounded-lg p-1.5 mt-0.5 shadow-sm">
            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-brand-800">Pro Tip</p>
            <p className="text-xs text-brand-600 mt-0.5">Review the <Link to="/alphabet" className="underline font-semibold hover:text-brand-800 transition-colors">alphabet</Link> and <Link to="/words" className="underline font-semibold hover:text-brand-800 transition-colors">words</Link> sections before taking the quiz!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
