import React, { PureComponent } from "react";
import axios from "axios";
import PokeList from "./PokeList.jsx";
import Teams from "./Teams";
import LoadingGif from "./Pikaloading.gif";
import "babel-polyfill";
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
      Loading: false,
      NoResults: false,
      key: 0
    };

    this.getPokemon = this.getPokemon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.imageClick = this.imageClick.bind(this);
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
        this.setState({ Loading: false });
      } catch {
        console.log("ERROR SEARCH POKEMON BY NAME");
        this.setState({ NoResults: true });
      }
    } else {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/type/${this.state.search}`
      );
      this.setState({ stats: result.data });
      let pokemonArray = result.data.pokemon;
      let newArray = pokemonArray.map(item => {
        return axios.get(item.pokemon.url);
      });

      Promise.all(newArray).then(result => {
        var finalResult = result.map(each => {
          return each.data;
        });
        this.setState({ Loading: false });
        this.setState({ pokemon: finalResult, NoResults: false });
      });
    }
  }

  submitClick(e) {
    this.setState({ Loading: true });
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
    // if (this.state.key <= 5) {
    //   let newKey = this.state.key;
    //   let obj = { ...this.state.teams };
    //   obj[newKey] = pokemon;
    //   this.setState({ teams: obj });
    //   this.setState({ key: newKey + 1 });
    // }
    // this.setState({ key: newKey });
  }

  deleteTeamMember(id) {
    // let obj = { ...this.state.teams };
    // delete obj[id];
    // let newKey = this.state.key;
    // this.setState({ teams: obj });
    // this.setState({ key: newKey - 1 });
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
                  WRONG UNIVERSE! This is POKEmon NOT DIGImon, Get it together!
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
                identity={this.state.key}
              />{" "}
            </div>
          ) : null}
        </div>

        {this.state.Loading ? (
          <div className="Loading">
            LOADING...
            <img src={LoadingGif} style={{ padding: "0px 20px" }} />
          </div>
        ) : null}

        {this.state.pokemon.length === 0 ? null : (
          <PokeList
            stats={this.state.stats}
            Pokemon={this.state.pokemon}
            imageClick={this.imageClick}
            toggleClick={this.toggleClick}
            identity={this.state.key}
          />
        )}
      </div>
    );
  }
}

export default App;
