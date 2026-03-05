import React, { useState } from 'react'

function QuizCard({ compact = false,quizData=[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)
  if (!quizData || quizData.length === 0) {
  return <div className="text-center py-8 text-slate-400">Loading quiz...</div>
  }
  const question = quizData[currentQuestion]

  const handleOptionClick = (option) => {
    if (selectedOption) return
    setSelectedOption(option)

    if (option === question.answer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setShowResult(true)
      }
    }, 800)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedOption(null)
    setShowResult(false)
  }

  const getOptionStyle = (option) => {
    if (!selectedOption) {
      return 'bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 hover:border-brand-300'
    }
    if (option === question.answer) {
      return 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    }
    if (option === selectedOption && option !== question.answer) {
      return 'bg-red-100 text-red-800 border border-red-300'
    }
    return 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60'
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.length) * 100)
    return (
      <div className={`bg-white rounded-2xl shadow-card ${compact ? 'p-4' : 'p-8'}`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center rounded-full bg-brand-100 ${compact ? 'w-16 h-16 mb-3' : 'w-24 h-24 mb-6'}`}>
            <span className={`font-bold text-brand-700 ${compact ? 'text-xl' : 'text-3xl'}`}>{percentage}%</span>
          </div>
          <h3 className={`font-bold text-slate-900 ${compact ? 'text-base mb-1' : 'text-2xl mb-2'}`}>Quiz Complete!</h3>
          <p className={`text-slate-500 ${compact ? 'text-sm mb-3' : 'text-base mb-6'}`}>
            You got <span className="text-brand-600 font-semibold">{score}</span> out of {quizData.length} correct
          </p>
          <button
            onClick={resetQuiz}
            className={`bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all border-none cursor-pointer font-semibold shadow-sm hover:shadow-md ${compact ? 'px-4 py-2 text-sm' : 'px-8 py-3 text-base'}`}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-card ${compact ? 'p-4' : 'p-6'}`}>
      {/* Progress bar */}
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
        <span className="text-xs font-medium text-slate-400">
          {currentQuestion + 1} / {quizData.length}
        </span>
        <div className={`bg-slate-100 rounded-full overflow-hidden ${compact ? 'w-20 h-1.5' : 'w-32 h-2'}`}>
          <div
            className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className={`font-bold text-slate-900 ${compact ? 'text-sm mb-2' : 'text-lg mb-4'}`}>
        {question.question}
      </h3>
      <div className={`bg-slate-50 rounded-xl ${compact ? 'p-2 mb-3' : 'p-4 mb-5'}`}>
        <img
          src={question.image}
          alt="Quiz sign"
          className={`mx-auto object-contain rounded-lg ${compact ? 'h-24' : 'h-44'}`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="12" fill="#f0fdfa"/><text x="100" y="115" font-size="48" font-family="Inter,Arial,sans-serif" fill="#0f766e" text-anchor="middle" font-weight="700">?</text></svg>')}`
          }}
        />
      </div>
      <div className={`grid grid-cols-2 ${compact ? 'gap-2' : 'gap-3'}`}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`${compact ? 'py-2 px-2 text-xs' : 'py-3 px-4 text-sm'} rounded-xl font-semibold transition-all cursor-pointer ${getOptionStyle(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={`flex items-center justify-between ${compact ? 'mt-2' : 'mt-4'}`}>
        <span className={`text-slate-400 font-medium ${compact ? 'text-xs' : 'text-sm'}`}>Score</span>
        <span className={`text-brand-600 font-bold ${compact ? 'text-sm' : 'text-lg'}`}>{score}</span>
      </div>
    </div>
  )
}

export default QuizCard
