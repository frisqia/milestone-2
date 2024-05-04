import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PokemonDashboardProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonResultWithImage {
  name: string;
  url: string;
  imageUrl: string;
}

function PokemonDashboard() {
  const [pokemonResults, setPokemonResults] = useState<
    PokemonResultWithImage[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const url = "https://pokeapi.co/api/v2/pokemon";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch pokemon data!");
        }
        const data = await response.json();

        const imageUrlArray = data.results.map((pokemon: PokemonResult) => ({
          name: pokemon.name,
          url: pokemon.url,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split("/")[6]
          }.png`,
        }));

        setPokemonResults(imageUrlArray);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchPokemons();
  }, []);

  function handleNavigate(pokemon: PokemonResultWithImage) {
    navigate(`/${pokemon.name}`, { state: pokemon });
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {isLoading && <h1>Loading ....</h1>}
      {!isLoading &&
        pokemonResults.length > 0 &&
        pokemonResults.map((result) => (
          <div
            key={result.name}
            onClick={() => handleNavigate(result)}
            className="rounded-lg bg-orange-500 shadow-md p-4 text-center relative"
          >
            <img src={result.imageUrl} alt={result.name} className="mx-auto" />
            <h1 className="text-white font-bold text-lg mt-2">{result.name}</h1>
          </div>
        ))}
    </div>
  );
}

export default PokemonDashboard;
