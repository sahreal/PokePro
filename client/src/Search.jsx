import React, { PureComponent } from "react";

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <input name="TEST" placeholder="TEST"></input>
        <button>Submit</button>
      </div>
    );
  }
}

export default Search;

//only 20 types
// var types = [
//   "normal",
//   "fighting",
//   "flying",
//   "poison",
//   "ground",
//   "rock",
//   "bug",
//   "ghost",
//   "steel",
//   "fire",
//   "water",
//   "grass",
//   "electric",
//   "psychic",
//   "ice",
//   "dragon",
//   "dark",
//   "fairy",
//   "shadow",
//   "unknown"
// ];
