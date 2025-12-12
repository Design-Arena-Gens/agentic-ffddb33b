'use client'

import { useState } from 'react'

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] }
      }
    }
    return null
  }

  const result = calculateWinner(board)
  const winner = result?.winner
  const winningLine = result?.line || []
  const isDraw = !winner && board.every(square => square !== null)

  const handleClick = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const newResult = calculateWinner(newBoard)
    if (newResult) {
      setTimeout(() => {
        setScores(prev => ({ ...prev, [newResult.winner]: prev[newResult.winner] + 1 }))
      }, 500)
    } else if (newBoard.every(square => square !== null)) {
      setTimeout(() => {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
      }, 500)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 })
    resetGame()
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic Tac Toe</h1>

      <div style={styles.scoreBoard}>
        <div style={styles.scoreItem}>
          <span style={styles.scoreLabel}>Player X</span>
          <span style={styles.scoreValue}>{scores.X}</span>
        </div>
        <div style={styles.scoreItem}>
          <span style={styles.scoreLabel}>Draws</span>
          <span style={styles.scoreValue}>{scores.draws}</span>
        </div>
        <div style={styles.scoreItem}>
          <span style={styles.scoreLabel}>Player O</span>
          <span style={styles.scoreValue}>{scores.O}</span>
        </div>
      </div>

      <div style={styles.status}>
        {winner ? (
          <span style={styles.winnerText}>🎉 Player {winner} Wins! 🎉</span>
        ) : isDraw ? (
          <span style={styles.drawText}>It's a Draw!</span>
        ) : (
          <span>Next Player: <strong style={{ color: isXNext ? '#3b82f6' : '#ef4444' }}>{isXNext ? 'X' : 'O'}</strong></span>
        )}
      </div>

      <div style={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            style={{
              ...styles.square,
              ...(winningLine.includes(index) ? styles.winningSquare : {}),
              color: value === 'X' ? '#3b82f6' : '#ef4444'
            }}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div style={styles.buttons}>
        <button style={styles.button} onClick={resetGame}>
          New Game
        </button>
        <button style={{ ...styles.button, ...styles.resetButton }} onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '30px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  },
  scoreBoard: {
    display: 'flex',
    gap: '30px',
    marginBottom: '30px',
    background: 'white',
    padding: '20px 40px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
  },
  scoreItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  scoreLabel: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: '600'
  },
  scoreValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333'
  },
  status: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontWeight: '600',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center'
  },
  winnerText: {
    fontSize: '1.8rem',
    animation: 'bounce 0.5s ease'
  },
  drawText: {
    fontSize: '1.8rem',
    color: '#fbbf24'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 120px)',
    gridTemplateRows: 'repeat(3, 120px)',
    gap: '10px',
    marginBottom: '30px'
  },
  square: {
    width: '120px',
    height: '120px',
    fontSize: '3rem',
    fontWeight: 'bold',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  winningSquare: {
    backgroundColor: '#fef08a',
    animation: 'pulse 0.5s ease'
  },
  buttons: {
    display: 'flex',
    gap: '15px'
  },
  button: {
    padding: '12px 30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#10b981',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  },
  resetButton: {
    backgroundColor: '#8b5cf6'
  }
}
