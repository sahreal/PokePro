import React from "react";
import PokemonSlide from "./PokemonSlide.jsx";
import "./PokemonList.css";

function PokeList({ Pokemon, imageClick, stats, toggleClick, identity }) {
  return (
    <div className="Grid">
      {Pokemon.length > 1 ? (
        Pokemon.map(item => {
          return (
            <PokemonSlide
              className="Image"
              PokeImg={item}
              imageClick={imageClick}
              stats={stats}
              toggleClick={toggleClick}
              identity={identity}
            />
          );
        })
      ) : (
        <PokemonSlide
          PokeImg={Pokemon}
          imageClick={imageClick}
          stats={stats}
          toggleClick={toggleClick}
          identity={identity}
        />
      )}
    </div>
  );
}

export default PokeList;
