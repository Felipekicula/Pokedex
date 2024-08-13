import React, { useEffect, useState } from "react";
import './App.css';

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
    <div className="container">
      <header className="d-flex justify-content-center mb-4">
        <div className="cabecalho">
          <h1 className="btn btn-primary">Pokedex</h1>
        </div>
      </header>

      <div className="row justify-content-center">
        {pokemonList.map((pokemon, index) => (
          <div className="col-md-4 mb-4" key={index}>

            <div className="card" style={{ width: '18rem' }}>

              <img src={pokemon.sprites.front_default} className="card-img-top" alt={pokemon.name} />
              
              <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <p className="card-text">Altura: {pokemon.height} decímetros</p>
              <p className="card-text">Peso: {pokemon.weight} hectogramas</p>
              <p className="card-text">Experiência básica: {pokemon.base_experience}</p>

            </div>

          </div>

        </div>

      ))}
    </div>
  </div>

    
  );
}

export default App;
