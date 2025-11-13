import React from 'react'

function GameBoard({ players, snakes, ladders }) {
  const boardSize = 10
  const cells = 100

  const getCellContent = (cellNumber) => {
    const player = players.find(p => p.position === cellNumber)
    return player
  }

  const getCellClass = (cellNumber) => {
    let baseClass = 'flex items-center justify-center font-bold text-sm border border-gray-300 relative '
    
    if (snakes[cellNumber]) {
      baseClass += 'bg-red-100 text-red-600'
    } else if (ladders[cellNumber]) {
      baseClass += 'bg-green-100 text-green-600'
    } else {
      baseClass += 'bg-white hover:bg-gray-50'
    }
    
    return baseClass
  }

  const renderBoard = () => {
    const board = []
    let cellCounter = 100

    for (let row = 0; row < boardSize; row++) {
      const rowCells = []
      
      if (row % 2 === 0) {
        for (let col = boardSize - 1; col >= 0; col--) {
          const player = getCellContent(cellCounter)
          rowCells.push(
            <div
              key={cellCounter}
              className={`${getCellClass(cellCounter)} h-16 text-center p-2`}
            >
              {player ? (
                <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                  P{player.id}
                </div>
              ) : (
                <span className="text-gray-400">{cellCounter}</span>
              )}
            </div>
          )
          cellCounter--
        }
      } else {
        for (let col = 0; col < boardSize; col++) {
          const player = getCellContent(cellCounter)
          rowCells.push(
            <div
              key={cellCounter}
              className={`${getCellClass(cellCounter)} h-16 text-center p-2`}
            >
              {player ? (
                <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                  P{player.id}
                </div>
              ) : (
                <span className="text-gray-400">{cellCounter}</span>
              )}
            </div>
          )
          cellCounter--
        }
      }

      board.push(
        <div key={row} className="grid grid-cols-10 gap-0">
          {rowCells}
        </div>
      )
    }

    return board
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg">
      <div className="grid grid-cols-10 gap-0 bg-gray-200">
        {renderBoard()}
      </div>
    </div>
  )
}

export default GameBoard
