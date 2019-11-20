import React, { PureComponent } from "react";
import axios from "axios";
import PokeList from "./PokeList.jsx";
//import Search from "./Search.jsx";
//import "/Main.css";
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      pokemon: [],
      search: ""
    };

    this.getPokemon = this.getPokemon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.imageClick = this.imageClick.bind(this);
  }
  componentWillMount() {}

  getPokemon() {
    var types = [
      "normal",
      "fighting",
      "flying",
      "poison",
      "ground",
      "rock",
      "bug",
      "ghost",
      "steel",
      "fire",
      "water",
      "grass",
      "electric",
      "psychic",
      "ice",
      "dragon",
      "dark",
      "fairy",
      "shadow",
      "unknown"
    ];
    if (!types.includes(this.state.search)) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
        .then(result => {
          this.setState({ pokemon: result.data.sprites });
        })
        .catch(err => console.log(err, "ERROR"));
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/type/${this.state.search}`)
        .then(result => {
          var pokemonArray = result.data.pokemon;
          let newArray = [];
          for (let each of pokemonArray) {
            axios
              .get(each.pokemon.url)
              .then(result => {
                newArray.push(result.data.sprites);
              })
              .catch(err => console.log("Sprites Request Error"));
          }
          this.setState({ pokemon: newArray });
        })
        .catch(err => console.log(err, "POKEMON TYPE REQUEST ERROR"));
    }
  }

  postPokemon() {}

  handleChange(e) {
    //e.preventDefault();

    //let name = e.target.name;
    let value = e.target.value;
    console.log(value, "value");
    this.setState({ search: value });
  }

  submitClick(e) {
    console.log("CLICK");
    // e.preventDefault();
    this.getPokemon();
  }

  imageClick(e) {
    console.log("imageCLICK");
    // e.preventDefault();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Go!"
        ></input>
        <button type="button" onClick={this.submitClick}>
          Go!
        </button>
        {/* <Search /> */}
        <PokeList Pokemon={this.state.pokemon} imageClick={this.imageClick} />
      </div>
    );
  }
}

export default App;
