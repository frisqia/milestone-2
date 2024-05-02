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
  const [text, setText] = useState(""); // State untuk menyimpan teks input
  const [isLoading, setIsLoading] = useState(false); // State untuk menandakan status loading
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null); // State untuk menyimpan data Pokemon
  const [searchTriggered, setSearchTriggered] = useState(false); // State untuk menandakan apakah pencarian telah dilakukan

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        const data = await response.json();
        console.log(data); //object abilities dll
        setPokemonData(data); // Mengupdate state dengan data Pokemon yang diperoleh dari API
        setIsLoading(false); // Mengubah status loading menjadi false setelah data diperoleh
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        setIsLoading(false); // Mengubah status loading menjadi false jika terjadi error
      }
    }

    if (searchTriggered) {
      // Memulai pencarian jika searchTriggered true
      setIsLoading(true); // Mengubah status loading menjadi true saat pencarian dimulai
      fetchPokemon(); // Memanggil fungsi untuk melakukan pencarian pokemon
    }
  }, [text, searchTriggered]); // Efek akan dijalankan saat ada perubahan pada text atau searchTriggered

  const handleSearch = () => {
    if (text !== "") {
      // Memastikan input tidak kosong sebelum memulai pencarian
      setSearchTriggered(true); // Mengubah status searchTriggered menjadi true saat tombol "Search" diklik
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value); // Mengupdate state text dengan nilai dari input
    setPokemonData(null); // Menghapus data Pokemon setiap kali input diubah
    setSearchTriggered(false); // Mengubah status searchTriggered menjadi false saat input diubah
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-xl border border-gray-300">
      {/* Container untuk komponen pencarian pokemon */}
      <div className="text-center mb-4">
        {/* Header judul komponen */}
        <h1 className="text-3xl font-semibold">Find your Pokemon</h1>
      </div>
      <div className="flex items-center justify-center mb-4">
        {/* Input untuk masukkan nama pokemon */}
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={text}
          onChange={handleInputChange} // Menghubungkan input dengan fungsi handleInputChange untuk mengupdate state text
          className="p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* Tombol "Search" untuk memulai pencarian */}
        <button
          onClick={handleSearch} // Menghubungkan tombol "Search" dengan fungsi handleSearch untuk memulai pencarian
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Search
        </button>
      </div>

      {/* Menampilkan status loading saat data sedang diambil */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        // Setelah loading, jika berhasil, menampilkan detail pokemon
        <div>
          {pokemonData ? (
            <div className="text-center">
              {/* Detail pokemon */}
              <h2 className="text-2xl font-semibold mb-2">
                {pokemonData.name}
              </h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="mx-auto"
              />
              <div className="mt-2">
                <div>
                  <span className="font-semibold">Height:</span>{" "}
                  {pokemonData.height}
                </div>
                <div>
                  <span className="font-semibold">Weight:</span>{" "}
                  {pokemonData.weight}
                </div>
                <h3 className="text-lg font-semibold mt-2">Abilities:</h3>
                <ul className="list-disc list-inside">
                  {pokemonData.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            // Jika pencarian dilakukan tapi tidak ada hasil
            searchTriggered && (
              <div className="text-center">No Pokemon found</div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonFind;
