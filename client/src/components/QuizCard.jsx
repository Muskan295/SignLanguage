import React, { useState } from 'react'

function QuizCard({ compact = false, quizData = [] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)

  if (!quizData || quizData.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <div className="text-3xl mb-3">📝</div>
        <p className="font-medium">Loading quiz...</p>
      </div>
    )
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
      return 'bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 hover:border-brand-200 hover:shadow-sm'
    }
    if (option === question.answer) {
      return 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    }
    if (option === selectedOption && option !== question.answer) {
      return 'bg-red-50 text-red-700 border border-red-200'
    }
    return 'bg-slate-50 text-slate-300 border border-slate-100'
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.length) * 100)
    return (
      <div className={`animate-scale-in ${compact ? 'p-4' : 'p-6'}`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center rounded-2xl bg-brand-50 ${compact ? 'w-16 h-16 mb-3' : 'w-24 h-24 mb-5'}`}>
            <span className={`font-black text-gradient ${compact ? 'text-xl' : 'text-3xl'}`}>{percentage}%</span>
          </div>
          <h3 className={`font-bold text-slate-900 ${compact ? 'text-base mb-1' : 'text-xl mb-2'}`}>
            {percentage >= 70 ? '🎉 Amazing!' : percentage >= 40 ? '👏 Good Try!' : '💪 Keep Practicing!'}
          </h3>
          <p className={`text-slate-500 ${compact ? 'text-sm mb-3' : 'text-sm mb-5'}`}>
            You got <span className="text-brand-600 font-semibold">{score}</span> out of <span className="font-semibold">{quizData.length}</span> correct
          </p>
          <button
            onClick={resetQuiz}
            className={`bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-200 border-none cursor-pointer font-semibold shadow-sm active:scale-[0.98] ${compact ? 'px-4 py-2 text-sm' : 'px-6 py-2.5 text-sm'}`}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={compact ? 'p-4' : 'p-1'}>
      {/* Progress bar */}
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          {currentQuestion + 1} / {quizData.length}
        </span>
        <div className={`bg-slate-100 rounded-full overflow-hidden ${compact ? 'w-20 h-1.5' : 'flex-1 mx-4 h-2'}`}>
          <div
            className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          />
        </div>
        <span className={`text-brand-600 font-semibold bg-brand-50 px-2.5 py-1 rounded-md ${compact ? 'text-xs' : 'text-xs'}`}>
          Score: {score}
        </span>
      </div>

      <h3 className={`font-semibold text-slate-900 ${compact ? 'text-sm mb-2' : 'text-base mb-3'}`}>
        {question.question}
      </h3>
      <div className={`bg-brand-50/30 rounded-xl ${compact ? 'p-2 mb-3' : 'p-4 mb-4'} border border-brand-100/50`}>
        <img
          src={question.image}
          alt="Quiz sign"
          className={`mx-auto object-contain rounded-lg ${compact ? 'h-24' : 'h-40'}`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="12" fill="#f5f3ff"/><text x="100" y="115" font-size="48" font-family="Inter,Arial,sans-serif" fill="#7c3aed" text-anchor="middle" font-weight="700">?</text></svg>')}`
          }}
        />
      </div>
      <div className={`grid grid-cols-2 ${compact ? 'gap-2' : 'gap-2.5'}`}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`${compact ? 'py-2 px-2 text-xs' : 'py-3 px-3 text-sm'} rounded-xl font-semibold transition-all duration-200 cursor-pointer active:scale-[0.97] ${getOptionStyle(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizCard
