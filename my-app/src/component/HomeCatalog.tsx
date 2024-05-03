import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

const HomeCatalog = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    
  )
}

export default HomeCatalog;
