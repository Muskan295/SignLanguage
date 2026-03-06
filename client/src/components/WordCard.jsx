import React from 'react'

const makePlaceholder = (text) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="16" fill="#ecfdf5"/><text x="100" y="115" font-size="${text.length > 5 ? 24 : 32}" font-family="Inter,Arial,sans-serif" fill="#059669" text-anchor="middle" font-weight="600">${text}</text></svg>`
  )}`

function WordCard({ word, image }) {
  return (
    <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-slate-100 hover:border-brand-300 hover:-translate-y-2 cursor-pointer">
      <div className="p-4 pb-2">
        <img
          src={image}
          alt={`Sign language for ${word}`}
          className="w-full h-40 object-contain rounded-xl bg-gradient-to-b from-slate-50 to-brand-50/30 p-2 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = makePlaceholder(word)
          }}
        />
      </div>
      <div className="text-center py-3.5 px-2 border-t border-slate-50">
        <span className="font-bold text-slate-700 text-sm group-hover:text-brand-600 transition-colors duration-300">
          {word}
        </span>
      </div>
    </div>
  )
}

export default WordCard
