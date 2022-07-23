import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pits, setPits] = useState();
  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(true);

  function GetUrlParam(start, end) {
    return parseInt(window.location.search.substring(start, end));
  }

  useEffect(() => {
    const callAPI = () => {
      const pits = GetUrlParam(6, 7);
      const stones = GetUrlParam(15, 16);
      setPits(pits);

      fetch(`http://localhost:9000/testAPI?pits=${pits}&stones=${stones}`)
        .then((res) => res.json())
        .then(({ board, player1 }) => UpdateBoard(board, player1));
    };
    callAPI();
  }, []);

  function PlayTurn(pit) {
    fetch(`http://localhost:9000/testAPI/play?pit=${pit}`)
      .then((res) => res.json())
      .then(({ board, player1 }) => UpdateBoard(board, player1));
  }

  function UpdateBoard(updatedBoard, currentPlayer) {
    setBoard(updatedBoard);
    setPlayer1(currentPlayer);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{player1 ? 'Player 1' : 'Player 2'}</p>

        <div
          style={{
            display: 'inline-block',
            top: '180px',
            position: 'relative',
            left: `${pits * 50 + 100}px`,
          }}
        >
          {board.map((item, index) => {
            if (index < pits)
              return (
                <button
                  onClick={() => PlayTurn(index)}
                  style={{
                    width: '100px',
                    height: '100px',
                    position: 'relative',
                    color: '#61dafb',
                  }}
                  disabled={!player1 || item === 0}
                  key={index}
                >
                  {item}
                </button>
              );
            else if (index === pits) {
              return (
                <button
                  style={{
                    width: '100px',
                    height: '200px',
                    top: '-50px',
                    position: 'relative',
                    color: '#61dafb',
                  }}
                  disabled={true}
                  key={index}
                >
                  {item}
                </button>
              );
            } else if (index === pits * 2 + 1) {
              return (
                <button
                  style={{
                    width: '100px',
                    height: '200px',
                    top: '-150px',
                    left: `-${pits * 200 + 200}px`,
                    position: 'relative',
                    color: '#FAAC61',
                  }}
                  disabled={true}
                  key={index}
                >
                  {item}
                </button>
              );
            } else
              return (
                <button
                  onClick={() => PlayTurn(index)}
                  style={{
                    width: '100px',
                    height: '100px',
                    top: `-200px`,
                    left: `-${index * 100 * 2 - 100 * pits * 2}px`,
                    position: 'relative',
                    color: '#FAAC61',
                  }}
                  disabled={player1 || item === 0}
                  key={index}
                >
                  {item}
                </button>
              );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
