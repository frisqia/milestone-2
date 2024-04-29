import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

function PokemonFind() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        const data = await response.json();
        setPokemonData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        // alert(error);
        setIsLoading(false);
      }
    }

    if (text !== "") {
      setIsLoading(true);
      fetchPokemon();
    }
  }, [text]);

  return (
    <div>
      <div className="">
        <h1>Pokemon Find</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setText(text)}>Search</button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {pokemonData ? (
            <div>
              <h2>{pokemonData.name}</h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />
              <div>Height: {pokemonData.height}</div>
              <div>Weight: {pokemonData.weight}</div>
              <h3>Abilities:</h3>
              <ul>
                {pokemonData.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No Pokemon found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonFind;
