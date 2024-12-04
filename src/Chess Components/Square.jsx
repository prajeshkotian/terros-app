import React from 'react'
import './Chessboard.css'

export default function Square({piece, isBlack, player, row, col, onPieceSelect, selectedPiece, ...props}) {
  return (
    <div className={`square ${isBlack ? 'black' : 'white'}`} onClick={()=>onPieceSelect(row, col)}>
        <span className={`${
        player === 'player1'
          ? 'player1'
          : player === 'player2'
          ? 'player2'
          : ''
      } ${selectedPiece && selectedPiece.row === row && selectedPiece.col === col ? 'Selected' : ''}`}>
          {piece}
        </span>
    </div>
  )
}
