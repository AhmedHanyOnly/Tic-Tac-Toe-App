import { useState } from "react";
import Player from "./Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./gameRules";
import GameOver from "./components/GameOver";

let BtnGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let player = {
  X: 'Player 1',
  O: 'Player 2',
}
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [Turn, setTurn] = useState([]);
  const [playerName, setPlayerName] = useState(player);

  function handlerPlaterActive(rowKey, colKey) {
    setActivePlayer((current) => (current === "X" ? "O" : "X"));
    setTurn((prev) => {
      let currentPlayer = "X";
      if (prev.length > 0 && prev[0].player === "X") {
        currentPlayer = "O";
      }
      const updateTurn = [
        { board: { rowKey, colKey }, player: currentPlayer },
        ...prev,
      ];
      // console.log(prev);
      return updateTurn;
    });
  }

  let gameBoard = [...BtnGame.map((array) => [...array])];
  for (let turn of Turn) {
    const { board, player } = turn;
    const { rowKey, colKey } = board;
    gameBoard[rowKey][colKey] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    let firstCom = gameBoard[combination[0].row][combination[0].column];
    let secondCom = gameBoard[combination[1].row][combination[1].column];
    let thirdCom = gameBoard[combination[2].row][combination[2].column];
    if (firstCom && firstCom === secondCom && firstCom === thirdCom) {
      winner = playerName[firstCom];
    }
  }
  const hasDraw = Turn.length == 9 && !winner;
  function replayGame() {
    setTurn([]);
  }
  function handlePlayerName(symbol, playerNameChanger) {
    setPlayerName(()=>{
      return {
        [symbol] : playerNameChanger
      }
    })
  }
  return (
    <>
      <div className="game-container">
        <ol className="players ">
          <Player
            activeClass={activePlayer === "X" ? "active" : ""}
            name={player.X}
            symbol="X"
            onChangeName={handlePlayerName}
          />
          <Player
            activeClass={activePlayer === "O" ? "active" : ""}
            name={player.O}
            symbol="O"
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} replayGame={replayGame} />
        )}
        <GameBoard gameBoard={gameBoard} onSelect={handlerPlaterActive} />
      </div>
      <Log turns={Turn} />
    </>
  );
}

export default App;
