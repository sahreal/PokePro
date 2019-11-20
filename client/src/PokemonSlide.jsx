import React from "react";

function PokemonSlide({ PokeImg, imageClick }) {
  return (
    <div>
      <img src={PokeImg} onClick={imageClick} />
    </div>
  );
}

export default PokemonSlide;
