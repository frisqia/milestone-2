import React, { useEffect, useState } from "react";

const URL = "https://pokeapi.co/api/v2/pokemon";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
};

type AllPokemonResponse = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

const useDebouncedValue = (inputValue: string | null, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

function HomeCatalog() {
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [allPokemonData, setAllPokemonData] =
    useState<AllPokemonResponse | null>(null);

  const debouncedSearchTerm = useDebouncedValue(search, 500);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  const getAllPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}`);
      const result = await response.json();
      if (response.ok) {
        setAllPokemonData(result);
        setLoading(false);
      } else throw new Error("failed get pokemon data");
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const getPokemonDataByName = async (pokemonName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/${pokemonName}`);
      const result = await response.json();
      if (response.ok) {
        setPokemonData(result);
        setLoading(false);
      } else throw new Error("get pokemon data failed");
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPokemon();
  });
  const onChangePokemonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (debouncedSearchTerm) getPokemonDataByName(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div>
      <div>
        {allPokemonData?.results &&
          allPokemonData?.results?.length > 0 &&
          allPokemonData?.results?.map((pokemon, index) => {
            return (
              <div key={`pokemon-${index}`}>
                <p>Name:{pokemon?.name}</p>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path></path>
                  </svg>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Pokemon Name"
          onChange={onChangePokemonName}
        />
        {!loading && pokemonData && (
          <img
            src={`${IMG_URL}${pokemonData?.id}.png`}
            alt={pokemonData?.name}
          />
        )}
        {loading && (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeCatalog;
