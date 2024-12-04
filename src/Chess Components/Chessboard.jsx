import React, { useEffect, useState } from 'react'
import './Chessboard.css'

import Square from './Square'
import { Button, message } from 'antd';


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


    const validateMove = (selectedPiece, targetRow, targetCol, boardState) => {
        const { piece, row, col, player } = selectedPiece;
        const rowDiff = Math.abs(targetRow - row);
        const colDiff = Math.abs(targetCol - col);
      
        switch (piece) {
          case '\u265F': // Black pawn
          case '\u2659': // White pawn
            if (player === 'player1') {
              // White pawn rules
              if (
                (rowDiff === 1 && colDiff === 0 && boardState[targetRow][targetCol].player === null) || //to  Move forward
                (rowDiff === 1 && colDiff === 1 && boardState[targetRow][targetCol].player === 'player2') // to Capture diagonally
              ) {
                return true;
              }
            } else {
              // Black pawn rules
              if (
                (rowDiff === 1 && colDiff === 0 && boardState[targetRow][targetCol].player === null) || //  to Move forward
                (rowDiff === 1 && colDiff === 1 && boardState[targetRow][targetCol].player === 'player1') //to Capture diagonally
              ) {
                return true;
              }
            }
            return false;
      
          case '\u265A': //  King
          case '\u2654': 
            return rowDiff <= 1 && colDiff <= 1;
      
          default:
            return true;
        }
      };

      

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

            if (!validateMove(selectedPiece, row, col, boardState)) {
                message.error('Invalid move!');
                return;
              }
            const newBoard=[...boardState]
            const existingPiece={...newBoard[row][col]}//get the previous piece at the position
            if(existingPiece.player !== player){
                newBoard[row][col]={...boardState[selectedPiece?.row][selectedPiece?.col]}
                newBoard[selectedPiece?.row][selectedPiece?.col]={ piece: '', player: null }
                if(existingPiece && ((existingPiece.piece === '\u265A' && player === 'player1') || (existingPiece.piece === '\u2654' && player === 'player2'))){
                    message.success(player+' Wins the game')
                }
                setSeletedPiece(null)
                setBoardState(newBoard)
            }else{
                message.warning("A pawn already exists of same color")
                return
            }
            
        }
        
    }

    const onUnselectPawn=()=>{
        setSeletedPiece(null)
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
        <div className='player info'>
            <Button onClick={onUnselectPawn}>{'Unselect Pawn'}</Button>
        </div>
        </>
      );
}
  
