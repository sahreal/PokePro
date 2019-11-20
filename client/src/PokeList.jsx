import React from "react";
import PokemonSlide from "./PokemonSlide.jsx";

function PokeList({ Pokemon, imageClick }) {
  return (
    <div className="Grid">
      {Pokemon.length > 1 ? (
        Pokemon.map(item => {
          // console.log(item, "WOW");
          return (
            <PokemonSlide
              className="Image"
              PokeImg={item.front_default}
              imageClick={imageClick}
            />
          );
        })
      ) : (
        <PokemonSlide PokeImg={Pokemon.front_default} imageClick={imageClick} />
      )}
    </div>
  );
}

export default PokeList;
