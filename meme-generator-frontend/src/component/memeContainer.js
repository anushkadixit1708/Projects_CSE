import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/MemeContainer.css";
const MemeContainer = ({ url , title}) => {

  const [textArray, setTextArray] = useState(["text1", "text2"]);
  const constraintsRef = useRef(null);
  
  useEffect(() => {
    let x = textArray
    x = x.map((text, i) => {
      return (
        <div>
          <input
            type="text"
            onChange={(e) => {
              textArray[i] = e.target.value;
              setTextArray(textArray);
              
            }}
            key={i}
            defaultValue={text}
            className="meme__inputText"
          />
          <br />
        </div>
      );
    });
    setArr(x)

    x = textArray
    x = x.map((text, i) => {
      return (
        <motion.h2
          key={i}
          drag
          dragMomentum={false}
          dragConstraints={constraintsRef}
        >
          {text}
        </motion.h2>
      );
    });
    setMemeText(x)
  })

  const [inputArr, setArr] = new useState();
  const [memeText, setMemeText] = new useState();

  return (
    <>
    <h2 style={{color: "white"}}>{title}</h2>
    <br/>
      <motion.div className="memeContainer">
        {memeText}
        <img ref={constraintsRef} src={url} alt=''/>
      </motion.div>
      <br />

      <div>{inputArr}</div>

      <div onClick = {() => {
        let x = textArray
        x.push('')
        setTextArray(x)
        console.log(textArray)
      }}
      
      className="memeContainer__button">
        Add Text
      </div>
      <div onClick = {() => {
        
        setTextArray([''])
        console.log(textArray)
      }}
      className="memeContainer__button">
        Clear
      </div>
    </>
  );
};

export default MemeContainer;
