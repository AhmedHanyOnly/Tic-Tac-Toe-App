import React from "react";

const GameOver = ({ winner, replayGame }) => {
  return (
    <div className="game-over">
      {winner && <h2> {winner} is winner!</h2>}
      {!winner && <h2>It is Draw!</h2>}
      <p>Do you want play again?</p>
      <button onClick={replayGame}>OK</button>
    </div>
  );
};

export default GameOver;
