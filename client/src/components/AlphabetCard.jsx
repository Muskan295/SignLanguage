import React from 'react'

const makePlaceholder = (text) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="16" fill="#ecfdf5"/><text x="100" y="120" font-size="64" font-family="Inter,Arial,sans-serif" fill="#059669" text-anchor="middle" font-weight="700">${text}</text></svg>`
  )}`

function AlphabetCard({ letter, image }) {
  return (
    <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-slate-100 hover:border-brand-300 hover:-translate-y-2 cursor-pointer">
      <div className="relative p-4 pb-2">
        <span className="absolute top-3 left-3 bg-gradient-to-br from-brand-500 to-brand-700 text-white text-xs font-bold w-8 h-8 rounded-xl flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
          {letter}
        </span>
        <img
          src={image}
          alt={`Sign language letter ${letter}`}
          className="w-full h-36 object-contain rounded-xl bg-gradient-to-b from-slate-50 to-brand-50/30 p-2 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = makePlaceholder(letter)
          }}
        />
      </div>
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white text-center py-3 font-bold text-sm tracking-wider group-hover:from-brand-700 group-hover:to-brand-800 transition-all duration-300">
        {letter}
      </div>
    </div>
  )
}

export default AlphabetCard
