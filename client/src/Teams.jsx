import React from "react";
import Xmark from "./window-close-solid.svg";
import "./Teams.css";

function Teams({ teams, deleteTeamMember, identity }) {
  const deleteClickHandler = e => {
    deleteTeamMember(e.target.alt);
  };

  return (
    <div className="Sprites">
      {Object.values(teams).map((pokemon, id) => {
        return (
          <div>
            <img
              src={Xmark}
              alt={id + 1}
              className="Xmark"
              onClick={deleteClickHandler}
            />
            <img src={pokemon.sprites.front_default} />
            <p>
              <b>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</b>
            </p>
            <p>{id + 1}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Teams;
