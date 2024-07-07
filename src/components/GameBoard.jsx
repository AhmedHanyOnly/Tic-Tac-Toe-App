const GameBoard = ({ onSelect, gameBoard }) => {
  return (
    <div className="game-board">
      <ol>
        {gameBoard.map((row, rowKey) => (
          <li key={rowKey}>
            <ol>
              {row.map((col, colKey) => (
                <li key={colKey}>
                  <button
                    onClick={() => onSelect(rowKey, colKey)}
                    disabled={col !== null}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GameBoard;
