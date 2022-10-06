import React from "react";

import DisplayText from "./DisplayText";
import DisplayImage from "./DisplayImage";

import "../styles/Screen.css";

const Screen = (props) => {
  const names = [
    "apple",
    "banana",
    "cat",
    "dog",
    "eggs",
    "fish",
    "grapes",
    "hat",
    "ice",
    "juice",
    "keyboard",
    "lion",
    "mango",
    "nose",
    "owl",
    "pencil",
    "queen",
    "rabbit",
    "sun",
    "tree",
    "umbrella",
    "van",
    "watch",
    "xylophone",
    "yarn",
    "zebra",
  ];

  return (
    <div className="Screen">
      <DisplayText name={names[`${props.pos}`]} />
      <DisplayImage name={names[`${props.pos}`]} />
    </div>
  );
};

export default Screen;
