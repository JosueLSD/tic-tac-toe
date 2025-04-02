import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { checkWinner,checkTie } from "./logic/board.js";

function App() {
  const [board,setBoard]=useState(()=>{
    const boardFromStorage=window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn,setTurn]=useState(()=>{
    const turnFromStorage=window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X
  });
  const [winner,setWinner]=useState(null);
  
  
 

  const updateBoard=(index)=>{
    // si la casilla ya tiene una X o O o ya hay un ganador
    // no se puede modificar
    if (board[index]|| winner) return

    // se actualiza la casilla seleccionada
    const newBoard=[...board]; //se crea una copia del tablero ya que no se puede modificar el estado directamente
    newBoard[index]=turn;
    setBoard(newBoard);
    const newTurn=(turn===TURNS.X ? TURNS.O : TURNS.X);
    setTurn(newTurn);

    const newWinner=checkWinner(newBoard);
    //guardar partida
    window.localStorage.setItem('board',JSON.stringify(newBoard));
    window.localStorage.setItem('turn',newTurn);
    //se verifica si hay un ganador
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    }else if(checkTie(newBoard)){
      setWinner(false); //se verifica si hay un empate
    }
  }

  const resetGame=()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn'); 
  }

  return (
    <>
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square,index)=>{
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
    </>
  )
}

export default App
