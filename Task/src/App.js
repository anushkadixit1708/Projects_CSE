import './App.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';
import Header from './Header';

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");


  const getPokemon = async () => {
    const toArray = [];

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res);
    }
    catch (e) {
      console.log(e);
    }
  }


  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }


  return (
    <div className="App">
      <Header />
      <form action="" onSubmit={handleSubmit} className="form">
        <label>
          <input type="text" onChange={handleChange} placeholder="Enter Poke Name" /><br />
          <label htmlFor="" className='label'>Press Enter to Submit</label>
        </label>

      </form>
      {
        pokemonData.map((data) => {
          return (
            <div className="container">
              <img src={data.sprites["front_default"]} alt="" className='img' />
              <div className="pokeDex">
                <div className="pokeDexMain">
                  <div className="pokeDexCol">
                    <div className="pokeDexItem">TYPE</div>
                    <div className="pokeDexItem">{pokemonType}</div>
                  </div>
                  <div className="pokeDexCol">
                    <div className="pokeDexItem">HEIGHT</div>
                    <div className="pokeDexItem">{" "}{Math.round(data.height * 3.9)}"</div>
                  </div>
                  <div className="pokeDexCol">
                    <div className="pokeDexItem">WEIGHT</div>
                    <div className="pokeDexItem">{" "}{Math.round(data.weight / 4.3)} lbs</div>
                  </div>
                  <div className="pokeDexCol">
                    <div className="pokeDexItem">BATTLES</div>
                    <div className="pokeDexItem">{data.game_indices.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )

        })
      }

    </div>
  )
}
export default App;
