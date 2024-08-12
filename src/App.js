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
      <header className="pokedex">
        <h1>Pokedex</h1>
      </header>

      {pokemonList.map((pokemon, index) => (
        <article key={index} className="post">
          <strong>{pokemon.name}</strong>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Altura: {pokemon.height} decímetros</p>
          <p>Peso: {pokemon.weight} hectogramas</p>
          <p>Experiência básica: {pokemon.base_experience}</p>
        </article>
      ))}
    </div>
  );
}

export default App;
