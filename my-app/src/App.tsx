import React from "react";
import PokemonFind from "./component/PokemonFind";
import { Link, Route, Routes } from "react-router-dom";
import HomeCatalog from "./component/HomeCatalog";
import PokemonDashboard from "./component/PokemonDashboard";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 py-4">
        <h1 className="text-3xl text-white text-center">Pokemon Web APP</h1>
      </header>
      <div className="grid container mx-auto py-8">
        {/* <HomeCatalog /> */}
        <div className="flex">
          <nav className="flex justify-between">
            <Link to="/Pokedex">Pokedex</Link>
            <Link to="/Catalog">Catalog</Link>
          </nav>
          <Routes>
            <Route path="/Pokedex" element={<PokemonFind />} />
            <Route path="/Pokedex" element={<HomeCatalog />} />
          </Routes>
        </div>
        <PokemonDashboard />
      </div>
    </div>
  );
}

export default App;
