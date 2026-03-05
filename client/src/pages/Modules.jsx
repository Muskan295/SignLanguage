import React from 'react'
import {useState,useEffect} from 'react';
function Modules() {
  const [selectedLevel, setSelectedLevel] = useState('All')
  const[modulesData,setModulesData]=useState([]);
  useEffect(()=>{
    fetch('/api/modules').then(res=>res.json()).then(data=>setModulesData(data));
  },[])

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredModules = selectedLevel === 'All' 
    ? modulesData 
    : modulesData.filter(m => m.level === selectedLevel)

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-700'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'Advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Learning Modules</h1>
            <p className="text-slate-500 text-sm mt-1">Complete structured lessons to master sign language</p>
          </div>
          {/* Level Filter */}
          <div className="flex gap-2 flex-wrap">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-none cursor-pointer ${
                  selectedLevel === level
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <p className="text-brand-100 text-sm mt-1">Keep learning to unlock new modules!</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">0</p>
              <p className="text-brand-100 text-xs">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">10</p>
              <p className="text-brand-100 text-xs">Total</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">0%</p>
              <p className="text-brand-100 text-xs">Progress</p>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 bg-brand-400/30 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-0 transition-all duration-500"></div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModules.map((module) => (
          <div 
            key={module.id}
            className="bg-white rounded-2xl shadow-card border border-slate-100 hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-400">MODULE {module.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(module.level)}`}>
                      {module.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                    {module.description}
                  </p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {module.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {module.duration}
                  </span>
                </div>
                <button className="px-4 py-2 bg-brand-50 text-brand-600 rounded-lg text-sm font-semibold hover:bg-brand-100 transition-colors border-none cursor-pointer">
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-12 text-center">
          <p className="text-slate-400 text-lg">No modules found for this level</p>
        </div>
      )}
    </div>
  )
}

export default Modules
