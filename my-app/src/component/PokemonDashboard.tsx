import React, { useEffect, useState } from "react";

interface PokemonResult {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

function PokemonDashboard() {
  const [PokemonResults, setPokemoResults] = useState<PokemonResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const url = "https://pokeapi.co/api/v2/pokemon";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed Fetch pokemon data!");
        }
        const data = await response.json();
        //console.log(data.results, "INI DATA"); berhasil masuk object results

        setPokemoResults(data.results);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchPokemon();
  }, []);
  return (
    <>
      {isLoading == true && <h1>Loading ...</h1>}
      {isLoading == false &&
        PokemonResults.length > 0 &&
        PokemonResults.map((result) => {
          return (
            <div>
              <h1>{result.name}</h1>;
              {/* <img src={result.sprites.front_default}></img> */}
            </div>
          );
        })}
    </>
  );
}

export default PokemonDashboard;
