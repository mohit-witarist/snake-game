import React from 'react'

function Player({ player, isActive }) {
  return (
    <div className={`p-3 rounded-lg transition-all ${isActive ? 'ring-2 ring-yellow-400 shadow-lg' : ''} ${player.color}`}>
      <p className="text-white font-bold">{player.name}</p>
      <p className="text-white text-sm">Pos: {player.position}</p>
    </div>
  )
}

export default Player
