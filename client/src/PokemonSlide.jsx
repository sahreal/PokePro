import React from "react";
import Modal from "./Modal.jsx";
import "./PokemonSlide.css";

function PokemonSlide({ PokeImg, imageClick, stats, toggleClick }) {
  return (
    <div className="pokemonSlide">
      {PokeImg.front_default !== undefined ? (
        <div>
          <p>
            <b>{PokeImg.id}</b>
          </p>
          <img src={PokeImg.front_default} />
        </div>
      ) : (
        <div>
          {PokeImg.sprites.front_default === null ? (
            <p style={{ color: "red" }}>Image Unavailable</p>
          ) : (
            <div>
              <p>
                <b>{PokeImg.id}</b>
              </p>
              <img src={PokeImg.sprites.front_default} />
            </div>
          )}
        </div>
      )}
      <Modal
        PokeImg={PokeImg}
        imageClick={imageClick}
        stats={stats}
        toggleClick={toggleClick}
      />
    </div>
  );
}

export default PokemonSlide;
