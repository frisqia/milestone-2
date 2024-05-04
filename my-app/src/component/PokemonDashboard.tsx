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
  const [currentPage, setCurrentPage] = useState<number>(1); // State untuk menentukan halaman slide saat ini
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

  // Menghitung index batas bawah dan batas atas dari subset yang akan ditampilkan pada halaman slide saat ini
  const startIndex = (currentPage - 1) * 9;
  const endIndex = Math.min(startIndex + 9, pokemonResults.length);

  // Menghasilkan subset dari array pokemonResults berdasarkan halaman slide saat ini
  const currentPokemonSubset = pokemonResults.slice(startIndex, endIndex);

  // Fungsi untuk berpindah ke halaman slide berikutnya
  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(pokemonResults.length / 9))
    );
  };

  // Fungsi untuk berpindah ke halaman slide sebelumnya
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <br />
      <br />
      <div className="flex justify-center mb-4">
        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {currentPokemonSubset.map((result) => (
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
      <div className="flex justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1} // Tombol sebelumnya dinonaktifkan jika halaman slide saat ini adalah halaman pertama
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-l focus:outline-none focus:shadow-outline"
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(pokemonResults.length / 9)} // Tombol berikutnya dinonaktifkan jika halaman slide saat ini adalah halaman terakhir
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PokemonDashboard;
