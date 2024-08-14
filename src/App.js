import React, { useEffect, useState } from "react"; /*importa os hooks que vou utilizar*/
import './App.css'; /*importa css geral*/
import './cardstyle.css'; /*importa css dos cards*/

function App() {
  const [pokemonList, setPokemonList] = useState([]); /* cria const da lista pokemon*/

  useEffect(() => {
    const fetchAllPokemon = async () => { /*cria uma const com o fetch que vai pucar os dados da API*/
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1025'; /*link da API*/
      const response = await fetch(url);
      const data = await response.json();

      const pokemonDetailsPromises = data.results.map(async (pokemon) => { /*outra const que vai puxar a função .map que vai listar todos os dados definidos */
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
      <header className="d-flex align-items-center justify-content-center header-container"> {/*header estilizado com partes do bootstrap*/}
        <div className="text-center">
          <h1 className="display-3 text-white header-title">
            <span>Pokedex</span>
          </h1>
        </div>
      </header>
      <div className="separator"></div>
      

        <div className="container-fluid body"> {/* card dos pokemons usando alguns recursos do bootstrap tambem*/}
        <div className="row justify-content-center g-3 card-container">
          {/*listagem da const pokemonList com o .map */}
          {pokemonList.map((pokemon, index) => (  
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
              <div className="card">
                <img src={pokemon.sprites.front_default} className="card-img-top" alt={pokemon.name} /> {/*puxa imagem da API*/}
                <div className="card-body">
                  <h5 className="card-title">{pokemon.name}</h5> {/*puxa o nome do pokemon*/}
                  <p className="card-text">Altura: {pokemon.height} decímetros</p>  {/*puxa a altura*/}
                  <p className="card-text">Peso: {pokemon.weight} hectogramas</p> {/*puxa o peso */}
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
