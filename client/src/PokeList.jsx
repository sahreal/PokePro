import React from "react";
import PokemonSlide from "./PokemonSlide.jsx";
import "./PokemonList.css";

function PokeList({ Pokemon, imageClick, stats, toggleClick }) {
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
            />
          );
        })
      ) : (
        <PokemonSlide
          PokeImg={Pokemon}
          imageClick={imageClick}
          stats={stats}
          toggleClick={toggleClick}
        />
      )}
    </div>
  );
}

export default PokeList;
