import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

function HomeCatalog() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const url = "https://pokeapi.co/api/v2/pokemon";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon data!");
        }
        const data = await response.json();
        setPokemonList(data.results);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchPokemonList();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {pokemonList.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {pokemonList.map((pokemon, index) => (
                <div key={index} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <h1>{pokemon.name}</h1>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomeCatalog;


