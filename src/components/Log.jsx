import React from "react";

const Log = ({ turns }) => {
  return (
    <ol className="log">
      {turns.map((turn , turnIndex) => (
        <li key={turnIndex}>
          {turn.player} selected {turn.board.rowKey}, {turn.board.colKey}
        </li>
      ))}
    </ol>
  );
};

export default Log;
