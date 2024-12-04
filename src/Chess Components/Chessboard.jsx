import React, { useEffect, useState } from 'react'
import './Chessboard.css'

import Square from './Square'
import { message } from 'antd';


const initialBoard = [
    [
        { piece: '\u265C', player: 'player2' },
        { piece: '\u265E', player: 'player2' }, 
        { piece: '\u265D', player: 'player2' },
        { piece: '\u265B', player: 'player2' },
        { piece: '\u265A', player: 'player2' },
        { piece: '\u265D', player: 'player2' },
        { piece: '\u265E', player: 'player2' },
        { piece: '\u265C', player: 'player2' },
      ],
      [
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
        { piece: '\u265F', player: 'player2' },
      ],
      [{ piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }],
      [{ piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }],
      [{ piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }],
      [{ piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }, { piece: '', player: null }],
      [
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
        { piece: '\u2659', player: 'player1' },
      ],
      [
        { piece: '\u2656', player: 'player1' },
        { piece: '\u2658', player: 'player1' },
        { piece: '\u2657', player: 'player1' },
        { piece: '\u2655', player: 'player1' },
        { piece: '\u2654', player: 'player1' },
        { piece: '\u2657', player: 'player1' },
        { piece: '\u2658', player: 'player1' },
        { piece: '\u2656', player: 'player1' },
      ],
  ];

export default function Chessboard() {

    const [boardState, setBoardState] = useState(initialBoard)
    const [selectedPiece, setSeletedPiece] = useState(null)
    const [player, setPlayer] = useState('player1')

    useEffect(()=>{
        let newPlayer=''
        if(player === 'player1')
            newPlayer='player2'
        else
            newPlayer='player1'
        setPlayer(newPlayer)
    },[boardState])

    const onPieceSelect=(row, col)=>{

        
        if(!selectedPiece){ //if piece is not selected set the selcted piece
            if(player !== boardState[row][col].player){
                message.warning("You cannot select another players pieces");
                return
            }
            const obj={
                ...boardState[row][col],
                row: row,
                col: col
            }
            setSeletedPiece(obj)
        }else{ // if piece is already selected we are moving to new position on board
            const newBoard=[...boardState]
            const existingPiece={...newBoard[row][col]}//get the previous piece at the position
            newBoard[row][col]={...boardState[selectedPiece?.row][selectedPiece?.col]}
            newBoard[selectedPiece?.row][selectedPiece?.col]={ piece: '', player: null }
            if(existingPiece && existingPiece.player !== player && existingPiece.piece === '\u265A'){
                message.success(player+' Wins the game')
            }
            setSeletedPiece(null)
            setBoardState(newBoard)
        }
        
    }


    return (
        <>
        <div className='player-info'>
            <div>{player + ' Turn to Play'}</div>
            {selectedPiece ? ("SelectedPiece Col: "+selectedPiece.col+" Row:"+selectedPiece.row) : null }
        </div>
        <div className="chessboard">
          {boardState.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((square, colIndex) => (
                <Square key={`${rowIndex}-${colIndex}`} piece={square?.piece} isBlack={(rowIndex+colIndex) % 2 === 1 ? true : false} player={square?.player} row={rowIndex} col={colIndex} onPieceSelect={onPieceSelect} selectedPiece={selectedPiece} />
              ))}
            </div>
          ))}
        </div>
        </>
      );
}
  
