import { WINNER_COMBOS } from "../constants.js";

export const checkWinner=(boardToCheck)=>{
    
    for (const comb of WINNER_COMBOS) {
      const [a,b,c]=comb;
      if (  boardToCheck[a] && 
            boardToCheck[a]===boardToCheck[b] && 
            boardToCheck[a]===boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  export  const checkTie=(boardToCheck)=>{
    return boardToCheck.every((square)=>square!==null);
  }