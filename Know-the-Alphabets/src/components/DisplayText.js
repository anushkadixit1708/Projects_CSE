import React from "react";

import "../styles/DisplayText.css";

const DisplayText = (props) => {
  return (
    <div className="DisplayText">
      <h1>{props.name}</h1>
    </div>
  );
};

export default DisplayText;
