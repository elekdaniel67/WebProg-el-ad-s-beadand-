import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (sq) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    const next = board.slice();
    next[i] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  return (
    <div className="hero">
      <h2>Tic-Tac-Toe</h2>
      <p>{winner ? `Győztes: ${winner}` : `Következő: ${xIsNext ? 'X' : 'O'}`}</p>
      <div className="grid">
        {board.map((v, i) => (
          <div key={i} className="cell" onClick={() => handleClick(i)}>{v}</div>
        ))}
      </div>
      <button className="btn-primary" onClick={() => setBoard(Array(9).fill(null))}>Újra</button>
    </div>
  );
}