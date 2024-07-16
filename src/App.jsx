import { useState } from "react";
import Player from "./Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./gameRules";
import GameOver from "./components/GameOver";

const initialBtnGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const initialPlayer = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [turns, setTurns] = useState([]);
  const [playerName, setPlayerName] = useState(initialPlayer);

  function handlerPlaterActive(rowKey, colKey) {
    setTurns((prev) => {
      const currentPlayer = activePlayer;
      const updateTurn = [
        { board: { rowKey, colKey }, player: currentPlayer },
        ...prev,
      ];
      return updateTurn;
    });
    setActivePlayer((current) => (current === "X" ? "O" : "X"));
  }

  let gameBoard = [...initialBtnGame.map((array) => [...array])];
  for (let turn of turns) {
    const { board, player } = turn;
    const { rowKey, colKey } = board;
    gameBoard[rowKey][colKey] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    let firstCom = gameBoard[a.row][a.column];
    let secondCom = gameBoard[b.row][b.column];
    let thirdCom = gameBoard[c.row][c.column];
    if (firstCom && firstCom === secondCom && firstCom === thirdCom) {
      winner = playerName[firstCom];
      break;
    }
  }

  const hasDraw = turns.length === 9 && !winner;

  function replayGame() {
    setTurns([]);
    setActivePlayer("X");
  }

  function handlePlayerName(symbol, playerNameChanger) {
    setPlayerName((prev) => ({
      ...prev,
      [symbol]: playerNameChanger,
    }));
  }

  return (
    <>
      <div className="game-container">
        <ol className="players">
          <Player
            activeClass={activePlayer === "X" ? "active" : ""}
            name={playerName.X}
            symbol="X"
            onChangeName={handlePlayerName}
          />
          <Player
            activeClass={activePlayer === "O" ? "active" : ""}
            name={playerName.O}
            symbol="O"
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} replayGame={replayGame} />
        )}
        <GameBoard gameBoard={gameBoard} onSelect={handlerPlaterActive} />
      </div>
      <Log turns={turns} />
    </>
  );
}

export default App;
