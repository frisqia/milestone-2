import React from "react";
import PokemonFind from "./component/PokemonFind";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 py-4">
        <h1 className="text-3xl text-white text-center">Pokemon Web APP</h1>
      </header>
      <div className="grid container mx-auto py-8">
        <nav className="grid">
          <Link to="/Pokedex">Pokedex</Link>
        </nav>
        <Routes>
          <Route path="/Pokedex" element={<PokemonFind />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
