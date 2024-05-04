import React from "react";
import PokemonFind from "./component/PokemonFind";
import { Link, Route, Routes } from "react-router-dom";
import HomeCatalog from "./component/HomeCatalog";
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
            className="place-items-center w-80 h-14"
          />
        </div>
      </header>
      <div className="grid container mx-auto py-8">
        <nav className="flex items-center justify-center">
          <Link
            to="/Registration"
            className="text-3x1 flex  justify-between text-white"
          >
            Registrasi
          </Link>
          <Link
            to="/Login"
            className="text-3x1 flex  justify-between text-white"
          >
            Login
          </Link>
          <Link
            to="/Pokedex"
            className="text-3x1 flex  justify-between text-white"
          >
            Pokedex
          </Link>
          <Link
            to="/Catalog"
            className="text-3x1 flex  justify-between text-white"
          >
            catalog
          </Link>
        </nav>
        <Routes>
          <Route path="/Registration" element={<RegisterForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/" Component={PrivateRouter}>
            <Route path="/Pokedex" Component={PokemonFind} />
            <Route path="/Catalog" Component={PokemonDashboard} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
