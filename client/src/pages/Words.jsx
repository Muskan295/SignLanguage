import React from 'react'
import { useState, useEffect } from 'react'
import WordCard from '../components/WordCard'

function Words() {
  const [search, setSearch] = useState('')
  const [wordsData, setWordsData] = useState([])

  useEffect(() => {
    fetch('/api/words').then(res => res.json()).then(data => setWordsData(data))
  }, [])

  const filtered = wordsData.filter(item =>
    item.word.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-lg mb-2">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>
            Vocabulary
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Common <span className="text-gradient">Words</span></h1>
          <p className="text-slate-400 text-sm mt-1">Essential words and phrases in sign language</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
            {wordsData.length} words
          </span>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search words..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 w-full sm:w-48 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((item) => (
            <WordCard key={item.word} word={item.word} image={item.image} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-300">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm font-medium text-slate-400">No words found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Words
