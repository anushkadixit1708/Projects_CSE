import React, { useState, useEffect } from "react";

import KeyBoard from "./components/KeyBoard";
import Screen from "./components/Screen";

import "./styles/App.css";

const App = () => {
  const [pos, setPos] = useState();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      const reqKey = `${e.key.toUpperCase()}`;
      let activeKey = document.querySelector(`.Key[datakey="${reqKey}"]`);

      if (activeKey) {
        const ch = document.querySelector(".pressed");
        if (ch) ch.classList.remove("pressed");

        activeKey.classList.add("pressed");
        setPos(reqKey.charCodeAt(0) - 65);
      } else if (`${e.code}` === "Space") {
        const ch = document.querySelector(".pressed");
        if (ch) ch.classList.remove("pressed");

        activeKey = document.querySelector(`.Key[datakey="RESET"]`);
        activeKey.classList.add("pressed");

        setPos();

        document.addEventListener("transitionend", () => {
          activeKey.classList.remove("pressed");
        });
      }
    });
  });

  return (
    <div className="App">
      <Screen pos={pos} />
      <KeyBoard setPos={setPos} />
    </div>
  );
};

export default App;
