import React, { useEffect, useState } from "react";
import './App.css';
import './cardstyle.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
      const response = await fetch(url);
      const data = await response.json();

      const pokemonDetailsPromises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      });

      const allPokemonDetails = await Promise.all(pokemonDetailsPromises);
      setPokemonList(allPokemonDetails);
    };

    fetchAllPokemon();
  }, []);

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-center header-container">
        <div className="text-center">
          <h1 className="display-3 text-white header-title">
            <span>Pokedex</span>
          </h1>
        </div>
      </header>
      <div className="separator"></div>
      

      <div className="container-fluid body">
        <div className="row justify-content-center g-3 card-container">
          {pokemonList.map((pokemon, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
              <div className="card">
                <img src={pokemon.sprites.front_default} className="card-img-top" alt={pokemon.name} />
                <div className="card-body">
                  <h5 className="card-title">{pokemon.name}</h5>
                  <p className="card-text">Altura: {pokemon.height} decímetros</p>
                  <p className="card-text">Peso: {pokemon.weight} hectogramas</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default App;
