const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const helpers = require("./client/src/apiHelpers/getPokemon.js");
//const db = require("../db");
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/public")));

app.post("/teams", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO Team(name, sprites) VALUES(?) ";
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

let port = 5000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
