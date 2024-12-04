import React from 'react'
import './Chessboard.css'

export default function Chessboard() {
    const board = [];
    for (let row = 0; row < 8; row++) {
      const squares = [];
      for (let col = 0; col < 8; col++) {
        const isBlack = (row + col) % 2 === 1;
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`square ${isBlack ? 'black' : 'white'}`}
          ></div>
        );
      }
      console.log(squares)
      board.push(
        <div key={row} className="row">
          {squares.map(square=> square)}
        </div>
      );
    }
  
    return (<div className="chessboard">{board}</div>);
}
