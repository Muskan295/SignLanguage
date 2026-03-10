import React from 'react'
import { useState, useEffect } from 'react'

function Modules() {
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [modulesData, setModulesData] = useState([])

  useEffect(() => {
    fetch('/api/modules').then(res => res.json()).then(data => setModulesData(data))
  }, [])

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredModules = selectedLevel === 'All'
    ? modulesData
    : modulesData.filter(m => m.level === selectedLevel)

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Advanced': return 'bg-red-50 text-red-700 border-red-100'
      default: return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Learning <span className="text-gradient">Modules</span></h1>
          <p className="text-slate-400 text-sm mt-1">Complete structured lessons to master sign language</p>
        </div>
        <div className="flex gap-1.5">
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border-none cursor-pointer ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-violet-700 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-base font-bold">Your Progress</h2>
            <p className="text-white/60 text-xs mt-0.5">Keep learning to unlock new modules!</p>
          </div>
          <div className="flex gap-3">
            {[{ val: '0', label: 'Completed' }, { val: String(modulesData.length || '0'), label: 'Total' }, { val: '0%', label: 'Progress' }].map(stat => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-3.5 py-2">
                <p className="text-lg font-bold">{stat.val}</p>
                <p className="text-white/50 text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 bg-white/15 rounded-full h-1.5">
          <div className="bg-white rounded-full h-1.5 w-0 transition-all duration-500"></div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredModules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl border border-slate-100 hover:border-brand-200 hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="p-5">
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  {module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Module {module.id}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getLevelBadgeColor(module.level)}`}>{module.level}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">{module.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{module.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    {module.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {module.duration}
                  </span>
                </div>
                <button className="px-3 py-1.5 bg-brand-50 text-brand-600 rounded-lg text-xs font-semibold hover:bg-gradient-to-r hover:from-brand-500 hover:to-brand-600 hover:text-white transition-all duration-200 border-none cursor-pointer">
                  Start →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
          <p className="text-3xl mb-2">📭</p>
          <p className="text-slate-500 text-sm font-medium">No modules found for this level</p>
          <p className="text-slate-300 text-xs mt-1">Try selecting a different filter</p>
        </div>
      )}
    </div>
  )
}

export default Modules
