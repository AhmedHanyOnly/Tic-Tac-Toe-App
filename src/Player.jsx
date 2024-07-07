import { useState } from "react";

const Player = ({ name, symbol, activeClass, onChangeName }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [NamePlayer, setNamePlayer] = useState(name);
  let nameValue = <span className="player-name">{NamePlayer}</span>;
  if (isEdit) {
    nameValue = (
      <input type="text" onChange={handleNamePlayer} value={NamePlayer} />
    );
  }

  function handlerEdit() {
    setIsEdit((event) => !event);
    onChangeName(symbol, NamePlayer);
  }
  function handleNamePlayer(event) {
    setNamePlayer(event.target.value);
  }
  return (
    <li className={activeClass}>
      <div className="player">
        {nameValue}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handlerEdit}>{isEdit ? "Save" : "Edit"}</button>
      </div>
    </li>
  );
};

export default Player;
