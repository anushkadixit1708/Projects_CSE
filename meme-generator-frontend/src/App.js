import { useState, useEffect } from "react";
import "./styles/App.css";
import "axios";
import { getData } from "./api/getMemes";
import MemeContainer from "./component/memeContainer";


function App() {
  const [memes, setMemes] = useState();
  const [index, setIndex] = useState(Math.floor(Math.random() * 100));

  useEffect(() => {
    if (memes === undefined)
      getData().then((res) => {
        setMemes(res);
        console.log(res);
      });
  });

  const goPrevious = () => {
    let newIndex = (index - 1) % 100;
    if (newIndex < 0) newIndex = 99;
    setIndex(newIndex);
  };

  const goNext = () => {
    let newIndex = (index + 1) % 100;
    setIndex(newIndex);
  };

  const getRandom = () => {
    setIndex(Math.floor(Math.random() * 100));
  };

  return (
    <div className="app">
      <h1>Meme Generator</h1>

      <MemeContainer
        url={
          memes === undefined
            ? "https://i.imgflip.com/4/30b1gx.jpg"
            : memes[index].url
        }
        title={memes === undefined ? "Drake meme" : memes[index].name}
        
      />

      <div className="app__memeSelector">
        <div className="app__memeSelector__button" onClick={() => goPrevious()}>
          Go Previous
        </div>
        <div className="app__memeSelector__button" onClick={() => getRandom()}>
          Get Random
        </div>
        <div className="app__memeSelector__button" onClick={() => goNext()}>
          Go Next
        </div>
      </div>
    </div>
  );
}

export default App;
