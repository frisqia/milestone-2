import React from "react";
import PokemonFind from "./component/PokemonFind";
import { Link, Route, Routes } from "react-router-dom";
import HomeCatalog from "./component/HomeCatalog";

function App() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <header className="bg-blue-600 py-4">
        <h1 className="text-3xl text-white text-center">Pokemon Web APP</h1>
      </header>
      <div className="container mx-auto py-8">
        {/* <HomeCatalog /> */}
        <nav>
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
