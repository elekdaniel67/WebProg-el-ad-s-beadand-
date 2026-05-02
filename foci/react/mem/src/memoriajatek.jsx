import React, { useState, useEffect } from 'react';

export default function Memomiajáték() {
  const icons = ['⚽', '🏆', '👟', '🚩', '⚽', '🏆', '👟', '🚩'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const initGame = () => {
    setCards([...icons].sort(() => Math.random() - 0.5));
    setMatched([]);
    setFlipped([]);
  };

  useEffect(() => { initGame(); }, []);

  const handleFlip = (i) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) setMatched(prev => [...prev, ...newFlipped]);
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="hero">
      <h2>Memóriajáték</h2>
      <div className="mem-grid">
        {cards.map((icon, i) => (
          <div key={i} className={`card ${flipped.includes(i) ? 'flipped' : ''} ${matched.includes(i) ? 'hidden' : ''}`} onClick={() => handleFlip(i)}>
            {flipped.includes(i) ? icon : '?'}
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={initGame}>Új Játék</button>
    </div>
  );
}