import React from 'react'

const makePlaceholder = (text) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="12" fill="#f5f3ff"/><text x="100" y="120" font-size="64" font-family="Inter,Arial,sans-serif" fill="#7c3aed" text-anchor="middle" font-weight="700">${text}</text></svg>`
  )}`

function AlphabetCard({ letter, image }) {
  return (
    <div className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-slate-100 hover:border-brand-200 hover:-translate-y-1 cursor-pointer">
      <div className="relative p-3">
        <span className="absolute top-2 left-2 bg-gradient-to-br from-brand-500 to-brand-700 text-white text-[10px] font-bold w-6 h-6 rounded-lg flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-200">
          {letter}
        </span>
        <img
          src={image}
          alt={`Sign language letter ${letter}`}
          className="w-full h-28 object-contain rounded-lg bg-brand-50/30 p-2 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = makePlaceholder(letter)
          }}
        />
      </div>
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white text-center py-2 font-semibold text-xs tracking-wider group-hover:from-brand-700 group-hover:to-brand-800 transition-all duration-200">
        {letter}
      </div>
    </div>
  )
}

export default AlphabetCard
