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

  const handleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/logout",
        options
      );

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("token");
      navigate("/Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
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
              <img
                src={result.imageUrl}
                alt={result.name}
                className="mx-auto"
              />
              <h1 className="text-white font-bold text-lg mt-2">
                {result.name}
              </h1>
            </div>
          ))}
      </div>
    </>
  );
}

export default PokemonDashboard;
