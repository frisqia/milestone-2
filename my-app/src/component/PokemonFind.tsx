import React, { useEffect } from "react";

const PokemonFind: React.FC = () => {

  useEffect(()=>{
async function
  })

  const [text, setText] = React.useState("");
  return (
    <div>
      <div className="">
        <h1> Pokemon Find</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button>Search</button>
      </div>
      <div></div>
    </div>
  );
};
export default PokemonFind;
