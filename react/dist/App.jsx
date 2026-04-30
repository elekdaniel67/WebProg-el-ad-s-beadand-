import React, { useState } from 'react';
import TicTacToe from 'C:\Users\Elek Dániel\Documents\GitHub\WebProg-el-ad-s-beadand-\react\src\tictactoe.jsx';
import MemoryGame from 'C:\Users\Elek Dániel\Documents\GitHub\WebProg-el-ad-s-beadand-\react\src\memoriajatek.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('tictactoe');

  return (
    <div className="spa-container">
      <nav>
        <a 
          href="#" 
          className={activeTab === 'tictactoe' ? 'active' : ''} 
          onClick={() => setActiveTab('tictactoe')}
        >
          Tic-Tac-Toe
        </a>
        <a 
          href="#" 
          className={activeTab === 'memory' ? 'active' : ''} 
          onClick={() => setActiveTab('memory')}
        >
          Stadion Memória
        </a>
      </nav>

      <main>
        {activeTab === 'tictactoe' ? <TicTacToe /> : <MemoryGame />}
      </main>
    </div>
  );
}

export default App;