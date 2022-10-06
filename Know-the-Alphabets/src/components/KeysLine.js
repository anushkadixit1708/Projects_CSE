import React from "react";

import Key from "./Key";

import "../styles/KeyLine.css";

const KeyLine = (props) => {
  return (
    <div className="KeyLine">
      {props.keys.map((k) => (
        <Key key={k} name={k} />
      ))}
    </div>
  );
};

export default KeyLine;
