import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PokemonFind from "./component/PokemonFind";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon App</h1>
        <PokemonFind />
      </header>
    </div>
  );
}

export default App;
