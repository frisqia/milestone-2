import React from "react";
import PokemonFind from "./component/PokemonFind";
import { Link, Route, Routes } from "react-router-dom";
import HomeCatalog from "./component/HomeCatalog";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-orange-600 py-4">
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Logo"
            className="place-items-center w-80 h-14"
          />
        </div>
      </header>
      <div className="grid container mx-auto py-8">
        <nav className="grid">
          <Link
            to="/Pokedex"
            className="text-3x1 flex items-center justify-center text-white"
          >
            Pokedex
          </Link>
        </nav>
        <Routes>
          <Route path="/Pokedex" element={<PokemonFind />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
