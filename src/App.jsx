import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Dice from './components/Dice'
import { RotateCcw } from 'lucide-react'

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', position: 0, color: 'bg-red-500' },
    { id: 2, name: 'Player 2', position: 0, color: 'bg-blue-500' }
  ])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [diceValue, setDiceValue] = useState(0)
  const [gameMessage, setGameMessage] = useState('Click Roll Dice to start!')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)

  const snakes = {
    17: 4,
    54: 31,
    62: 18,
    87: 24,
    93: 73,
    95: 75,
    99: 79
  }

  const ladders = {
    2: 38,
    7: 14,
    15: 26,
    21: 42,
    28: 84,
    51: 67,
    72: 91,
    88: 99
  }

  const getBoardPosition = (position) => {
    if (snakes[position]) return snakes[position]
    if (ladders[position]) return ladders[position]
    return position
  }

  const rollDice = () => {
    if (gameOver) return

    const roll = Math.floor(Math.random() * 6) + 1
    setDiceValue(roll)

    const newPlayers = [...players]
    const currentPlayer = newPlayers[currentPlayerIndex]
    let newPosition = currentPlayer.position + roll

    if (newPosition > 100) {
      newPosition = 100 - (newPosition - 100)
      setGameMessage(`${currentPlayer.name} rolled ${roll}. Bounced back to ${newPosition}!`)
    } else {
      const finalPosition = getBoardPosition(newPosition)
      if (snakes[newPosition]) {
        setGameMessage(`${currentPlayer.name} rolled ${roll} and hit a snake! Moving to ${finalPosition}`)
      } else if (ladders[newPosition]) {
        setGameMessage(`${currentPlayer.name} rolled ${roll} and climbed a ladder! Moving to ${finalPosition}`)
      } else {
        setGameMessage(`${currentPlayer.name} rolled ${roll} and moved to ${newPosition}`)
      }
      newPosition = finalPosition
    }

    currentPlayer.position = Math.min(newPosition, 100)
    setPlayers(newPlayers)

    if (currentPlayer.position === 100) {
      setGameMessage(`🎉 ${currentPlayer.name} wins the game!`)
      setGameOver(true)
      setWinner(currentPlayer.name)
      return
    }

    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
  }

  const resetGame = () => {
    setPlayers([
      { id: 1, name: 'Player 1', position: 0, color: 'bg-red-500' },
      { id: 2, name: 'Player 2', position: 0, color: 'bg-blue-500' }
    ])
    setCurrentPlayerIndex(0)
    setDiceValue(0)
    setGameMessage('Click Roll Dice to start!')
    setGameOver(false)
    setWinner(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          🐍 Snake & Ladder 🪜
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <GameBoard players={players} snakes={snakes} ladders={ladders} />
            </div>
          </div>

          {/* Controls and Info */}
          <div className="space-y-6">
            {/* Current Player */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Current Player</h2>
              <div className={`${players[currentPlayerIndex].color} rounded-lg p-4 text-white`}>
                <p className="text-2xl font-bold">{players[currentPlayerIndex].name}</p>
                <p className="text-lg mt-2">Position: {players[currentPlayerIndex].position}</p>
              </div>
            </div>

            {/* Dice */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Dice Roll</h2>
              <Dice value={diceValue} onClick={rollDice} />
            </div>

            {/* Game Message */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Game Status</h2>
              <p className="text-gray-700 text-center font-semibold">{gameMessage}</p>
            </div>

            {/* Players Status */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Players</h2>
              <div className="space-y-3">
                {players.map((player, index) => (
                  <Player
                    key={player.id}
                    player={player}
                    isActive={index === currentPlayerIndex}
                  />
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Reset Game
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-600 mb-2">🐍 Snakes (Down)</h3>
              <p className="text-gray-700 text-sm">
                {Object.entries(snakes).map(([from, to]) => (
                  <span key={from}>{from} → {to}, </span>
                ))}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-green-600 mb-2">🪜 Ladders (Up)</h3>
              <p className="text-gray-700 text-sm">
                {Object.entries(ladders).map(([from, to]) => (
                  <span key={from}>{from} → {to}, </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
