import React from "react";

import "../styles/Key.css";

const Key = (props) => {
  const keyClass = `Key ${props.name}`;

  return (
    <div datakey={props.name} className={keyClass}>
      <h1>{props.name}</h1>
    </div>
  );
};

export default Key;
