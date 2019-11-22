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
      NoResults: false,
      key: 0
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
      console.log("");
      this.setState({ stats: result.data });
      let pokemonArray = result.data.pokemon;
      let newArray = pokemonArray.map(item => {
        return axios.get(item.pokemon.url);
      });

      Promise.all(newArray).then(result => {
        var finalResult = result.map(each => {
          return each.data;
        });
        this.setState({ pokemon: finalResult, NoResults: false });
      });

      // for (let each of pokemonArray) {
      //   const axiosResult = await axios.get(each.pokemon.url);
      //   newArray.push(axiosResult.data);
      // }
      //this.setState({ pokemon: newArray, NoResults: false });
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
    // this.setState({ NoResults: false });
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
    let newKey = this.state.key;
    console.log(newKey, "NEWKEY");
    let obj = { ...this.state.teams };
    if (Object.keys(obj).length === 0) {
      obj[newKey] = pokemon;
    } else {
      newKey++;
      obj[newKey] = pokemon;
    }

    this.setState({ teams: obj });
    this.setState({ key: newKey });
  }

  deleteTeamMember(id) {
    let obj = { ...this.state.teams };
    delete obj[id];
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
            this.state.search.slice(this.state.search.length - 3) === "mon" ? (
              <p>
                <b style={{ color: "red" }}>
                  WRONG UNIVERSE! GET OUTTA HERE YA %$#%# DIGIMON!
                </b>
              </p>
            ) : (
              <p>
                <b style={{ color: "red" }}>No Results Found</b>
              </p>
            )
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
            key={this.state.key}
          />
        )}
      </div>
    );
  }
}

export default App;
