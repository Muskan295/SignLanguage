import React from 'react'

const makePlaceholder = (text) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="12" fill="#f5f3ff"/><text x="100" y="115" font-size="${text.length > 5 ? 24 : 32}" font-family="Inter,Arial,sans-serif" fill="#7c3aed" text-anchor="middle" font-weight="600">${text}</text></svg>`
  )}`

function WordCard({ word, image }) {
  return (
    <div className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-slate-100 hover:border-brand-200 hover:-translate-y-1 cursor-pointer">
      <div className="p-3">
        <img
          src={image}
          alt={`Sign language for ${word}`}
          className="w-full h-32 object-contain rounded-lg bg-brand-50/30 p-2 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = makePlaceholder(word)
          }}
        />
      </div>
      <div className="text-center py-2.5 px-2 border-t border-slate-50">
        <span className="font-semibold text-slate-700 text-sm group-hover:text-brand-600 transition-colors duration-200">
          {word}
        </span>
      </div>
    </div>
  )
}

export default WordCard
