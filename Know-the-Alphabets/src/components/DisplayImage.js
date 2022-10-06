import React from "react";

import "../styles/DisplayImage.css";

const DisplayImage = (props) => {
  const imageHandler = () => {
    if (props.name)
      return (
        <img
          src={require(`../images/${props.name}.png`).default}
          alt={props.name}
        />
      );
  };

  return <div className="DisplayImage">{imageHandler()}</div>;
};

export default DisplayImage;
