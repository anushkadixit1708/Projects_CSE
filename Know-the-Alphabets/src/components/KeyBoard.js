import React from "react";

import KeyLine from "./KeysLine";

import "../styles/KeyBoard.css";

const KeyBoard = () => {
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "RESET",
  ];

  return (
    <div className="KeyBoard">
      <KeyLine keys={keys.slice(0, 10)} key="10" />
      <KeyLine keys={keys.slice(10, 19)} key="9" />
      <KeyLine keys={keys.slice(19, 26)} key="7" />
      <KeyLine keys={keys.slice(26)} key="1" />
    </div>
  );
};

export default KeyBoard;
