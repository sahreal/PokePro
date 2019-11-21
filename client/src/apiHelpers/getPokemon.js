const request = require("request");

let getPokemon = (name, done) => {
  let options = {
    url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    headers: {
      "User-Agent": "request"
    }
  };

  request(options, (err, res, body) => {
    done(err, JSON.parse(body));
  });

  //use this or axios

  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
};

//export the function itself use model.exports
module.exports.getPokemon = getPokemon;
