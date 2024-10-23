import React, { useState } from "react";
import '../component/game.css'; 

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {

    if (board[index] || winner) return;

    const copyBoard = [...board];
    copyBoard[index] = xTurn ? "X" : "O";
    setBoard(copyBoard);
    setXTurn(!xTurn);

    const winnerCombination = checkWinner(copyBoard);
    if (winnerCombination) {
      setWinner(copyBoard[winnerCombination[0]]);
    }
  };

  const checkWinner = (copyBoard) => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (copyBoard[a] && copyBoard[a] === copyBoard[b] && copyBoard[a] === copyBoard[c]) {
        return combinations[i];
      }
    }
    return null;
  };

  return (
    <div className="gameContainer">
      <div className="gameRow">
        {board.slice(0, 3).map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="gameRow">
        {board.slice(3, 6).map((value, index) => (
          <button
            key={index + 3}
            className="square"
            onClick={() => handleClick(index + 3)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="gameRow">
        {board.slice(6, 9).map((value, index) => (
          <button
            key={index + 6}
            className="square"
            onClick={() => handleClick(index + 6)}
          >
            {value}
          </button>
        ))}
      </div>

      {winner && <div className="winnerMessage">{winner} is the winner of this game!</div>}
    </div>
  );
};

export default Game;
