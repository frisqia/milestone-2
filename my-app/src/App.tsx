import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import PokemonFind from "./component/PokemonFind";
import PokemonDashboard from "./component/PokemonDashboard";
import RegisterForm from "./component/RegistrasiForm";
import LoginForm from "./component/LoginForm";
import PrivateRouter from "./component/PrivateRouter";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-orange-600 py-4">
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Logo"
            className="w-80 h-14"
          />
        </div>
      </header>
      <div className="grid container mx-auto py-8">
        <nav className="flex items-center justify-center space-x-4">
          <Link
            to="/Registration"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l-full"
          >
            Registrasi
          </Link>
          <Link
            to="/Login"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4"
          >
            Login
          </Link>
          <Link
            to="/Pokedex"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4"
          >
            Pokedex
          </Link>
          <Link
            to="/Catalog"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r-full"
          >
            Catalog
          </Link>
          <br />
          <hr />
          <br />
          <br />
        </nav>
        <Routes>
          <Route path="/Registration" element={<RegisterForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/Pokedex" element={<PokemonFind />} />
            <Route path="/Catalog" element={<PokemonDashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
