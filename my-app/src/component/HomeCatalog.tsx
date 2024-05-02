import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

const HomeCatalog = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        const data = await response.json();
        setPokemonList(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Pokemon Catalog</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonList.map((pokemon, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto"
              />
              <p className="text-center mt-2">{pokemon.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCatalog;
