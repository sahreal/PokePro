import React, { PureComponent } from "react";
import axios from "axios";
import PokeList from "./PokeList.jsx";
import Teams from "./Teams";
import "babel-polyfill";
//import Search from "./Search.jsx";
import "./Main.css";
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      pokemon: [],
      isLoaded: false,
      search: "",
      stats: {},
      teams: {},
      showTeams: false,
      toggle: false,
      NoResults: false
    };

    this.getPokemon = this.getPokemon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.imageClick = this.imageClick.bind(this);
    //this.getTeams = this.getTeams.bind(this);
    //this.postTeams = this.postTeams.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
    this.deleteTeamMember = this.deleteTeamMember.bind(this);
  }
  componentWillMount() {}

  async getPokemon() {
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
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
        );
        const stat = await axios.get(result.data.types[0].type.url);
        this.setState({ stats: stat.data });
        this.setState({ pokemon: result.data, NoResults: false });
      } catch {
        console.log("WOW BIG ERROR");
        this.setState({ NoResults: true });
      }
    } else {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/type/${this.state.search}`
      );
      this.setState({ stats: result.data });
      let pokemonArray = result.data.pokemon;

      let newArray = [];
      for (let each of pokemonArray) {
        const axiosResult = await axios.get(each.pokemon.url);
        newArray.push(axiosResult.data);
      }
      this.setState({ pokemon: newArray, NoResults: false });
    }
  }

  // getTeams() {
  //   axios
  //     .get("/teams")
  //     .then(result => console.log(result))
  //     .catch(err => console.log(err, "ERROR BIG TIME"));
  // }

  // postTeams(pokemon) {
  //   axios
  //     .post("/teams", pokemon)
  //     .then(() => this.getTeams())
  //     .catch(err => console.log(err));
  // }

  submitClick(e) {
    this.getPokemon();
  }

  toggleClick() {
    this.setState({ toggle: true });
  }
  handleChange(e) {
    let value = e.target.value;
    this.setState({ search: value });
  }

  imageClick(e, pokemon) {
    //let array = this.state.teams.concat(pokemon);
    //let obj = {};
    let key = 0;

    let obj = { ...this.state.teams };
    if (Object.keys(obj).length === 0) {
      obj[key] = pokemon;
    } else {
      for (key in obj) {
        if (obj[key]) {
          key++;
        }
        obj[key] = pokemon;
      }
    }

    console.log(obj, "OBJ");
    this.setState({ teams: obj, showTeams: true });
  }

  deleteTeamMember(id) {
    let obj = { ...this.state.teams };
    delete obj[id];
    console.log(obj, "OBJECT KEY DELETE");
    this.setState({ teams: obj });
  }

  render() {
    return (
      <div className="BKG">
        <div className="content">
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="I Choose You!"
          ></input>
          <button className="goButton" type="button" onClick={this.submitClick}>
            Go!
          </button>
          {this.state.NoResults ? (
            <p>
              <b style={{ color: "red" }}>No Results Found</b>
            </p>
          ) : null}
        </div>
        <div>
          {Object.keys(this.state.teams).length !== 0 ? (
            <div>
              {" "}
              Your Team:{" "}
              <Teams
                teams={this.state.teams}
                deleteTeamMember={this.deleteTeamMember}
              />{" "}
            </div>
          ) : null}
        </div>
        {this.state.pokemon.length === 0 ? null : (
          <PokeList
            stats={this.state.stats}
            Pokemon={this.state.pokemon}
            imageClick={this.imageClick}
            toggleClick={this.toggleClick}
          />
        )}
      </div>
    );
  }
}

export default App;
