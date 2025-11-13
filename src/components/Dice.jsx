import React from 'react'

function Dice({ value, onClick }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all text-lg shadow-lg"
      >
        Roll Dice
      </button>
      <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg flex items-center justify-center shadow-lg border-4 border-yellow-500">
        <span className="text-4xl font-bold text-gray-800">{value || '?'}</span>
      </div>
    </div>
  )
}

export default Dice
