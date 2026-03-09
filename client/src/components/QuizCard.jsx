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
      return 'bg-slate-50 text-slate-700 hover:bg-brand-50 hover:text-brand-700 border-2 border-slate-200 hover:border-brand-300 hover:shadow-md'
    }
    if (option === question.answer) {
      return 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300 shadow-sm'
    }
    if (option === selectedOption && option !== question.answer) {
      return 'bg-red-50 text-red-800 border-2 border-red-300 shadow-sm'
    }
    return 'bg-slate-50 text-slate-400 border-2 border-slate-200 opacity-50'
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.length) * 100)
    return (
      <div className={`bg-white rounded-2xl ${compact ? 'p-4' : 'p-8'} animate-scale-in`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 ${compact ? 'w-20 h-20 mb-3' : 'w-28 h-28 mb-6'} shadow-lg`}>
            <span className={`font-black text-gradient ${compact ? 'text-2xl' : 'text-4xl'}`}>{percentage}%</span>
          </div>
          <h3 className={`font-black text-slate-900 ${compact ? 'text-base mb-1' : 'text-2xl mb-2'}`}>
            {percentage >= 70 ? '🎉 Amazing!' : percentage >= 40 ? '👏 Good Try!' : '💪 Keep Practicing!'}
          </h3>
          <p className={`text-slate-500 ${compact ? 'text-sm mb-3' : 'text-base mb-6'}`}>
            You got <span className="text-brand-600 font-bold">{score}</span> out of <span className="font-bold">{quizData.length}</span> correct
          </p>
          <button
            onClick={resetQuiz}
            className={`bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 border-none cursor-pointer font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 active:scale-[0.98] ${compact ? 'px-4 py-2 text-sm' : 'px-8 py-3.5 text-base'}`}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl ${compact ? 'p-4' : 'p-6'}`}>
      {/* Progress bar */}
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-5'}`}>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {currentQuestion + 1} / {quizData.length}
        </span>
        <div className={`bg-slate-100 rounded-full overflow-hidden ${compact ? 'w-20 h-1.5' : 'flex-1 mx-4 h-2.5'}`}>
          <div
            className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          />
        </div>
        <span className={`text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-full ${compact ? 'text-xs' : 'text-sm'}`}>
          Score: {score}
        </span>
      </div>

      <h3 className={`font-bold text-slate-900 ${compact ? 'text-sm mb-2' : 'text-lg mb-4'}`}>
        {question.question}
      </h3>
      <div className={`bg-gradient-to-b from-slate-50 to-brand-50/30 rounded-2xl ${compact ? 'p-2 mb-3' : 'p-5 mb-6'} border border-slate-100`}>
        <img
          src={question.image}
          alt="Quiz sign"
          className={`mx-auto object-contain rounded-xl ${compact ? 'h-24' : 'h-48'}`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="16" fill="#ecfdf5"/><text x="100" y="115" font-size="48" font-family="Inter,Arial,sans-serif" fill="#059669" text-anchor="middle" font-weight="700">?</text></svg>')}`
          }}
        />
      </div>
      <div className={`grid grid-cols-2 ${compact ? 'gap-2' : 'gap-3'}`}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`${compact ? 'py-2 px-2 text-xs' : 'py-3.5 px-4 text-sm'} rounded-xl font-bold transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:scale-[0.97] ${getOptionStyle(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizCard
