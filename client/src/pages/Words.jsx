import React from 'react'
import {useState,useEffect} from 'react';
import WordCard from '../components/WordCard'


function Words() {
  const [search, setSearch] = useState('')
    const [wordsData,setWordsData]=useState([]);
  useEffect(()=>{
    fetch('/api/words').then(res=>res.json()).then(data=>setWordsData(data))
  },[])
  const filtered = wordsData.filter(item =>
    item.word.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-slate-100/80 p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Vocabulary
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Common <span className="text-gradient">Words</span></h1>
            <p className="text-slate-500 text-sm mt-2">Essential words and phrases in sign language</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-r from-brand-50 to-brand-100 text-brand-700 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
              {wordsData.length} words
            </span>
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search words..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 w-full sm:w-52 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-slate-100/80 p-7">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {filtered.map((item) => (
            <WordCard key={item.word} word={item.word} image={item.image} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No words found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Words
