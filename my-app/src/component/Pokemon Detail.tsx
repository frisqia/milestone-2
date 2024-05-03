import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PokemonResultWithImage {
  name?: string;
  url?: string;
  imageUrl?: string;
}
export const PokemonDetail = ({
  pokemon,
}: {
  pokemon: PokemonResultWithImage;
}) => {
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(state.url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        alert(error);
      }
    }
    fetchPokemon();
  }, []);

  return <h1>Testing</h1>;
};
