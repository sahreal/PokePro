import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./Modal.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  overflow: "scroll"
}));

export default function SimpleModal({
  PokeImg,
  imageClick,
  stats,
  toggleClick,
  key
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddToTeam = e => {
    let pokemon = PokeImg;
    imageClick(e, pokemon);
  };
  return (
    <div>
      <div className="pokeId">
        <button type="button" onClick={handleOpen}>
          {PokeImg.name[0].toUpperCase() + PokeImg.name.slice(1)}
        </button>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={{ overflow: "hidden" }}
      >
        <div style={modalStyle} className={classes.paper}>
          <h1 id="name">
            {" "}
            {PokeImg.name[0].toUpperCase() + PokeImg.name.slice(1)}
          </h1>
          <h2>
            {" "}
            type:{" "}
            <em>
              {PokeImg.types.length > 1
                ? PokeImg.types[1].type.name[0].toUpperCase() +
                  PokeImg.types[1].type.name.slice(1) +
                  ", " +
                  PokeImg.types[0].type.name[0].toUpperCase() +
                  PokeImg.types[0].type.name.slice(1)
                : PokeImg.types[0].type.name[0].toUpperCase() +
                  PokeImg.types[0].type.name.slice(1)}
            </em>
          </h2>
          <img src={PokeImg.sprites.front_default} />
          <div className="stats">
            <span>
              <b>Weak Against:</b>{" "}
              {stats.damage_relations.double_damage_from.map(type => {
                return <p>{type.name}</p>;
              })}
            </span>
            <span>
              <b>Strong Against:</b>{" "}
              {stats.damage_relations.double_damage_to.map(type => {
                return <p>{type.name}</p>;
              })}
            </span>
            <span>
              <b>Moves: </b>
              {PokeImg.moves.slice(0, 5).map(item => {
                return <p>{item.move.name}</p>;
              })}
            </span>
          </div>
          <button type="button" onClick={AddToTeam}>
            Add to Team
          </button>
          <button type="button" onClick={handleClose}>
            Exit
          </button>
        </div>
      </Modal>
    </div>
  );
}
