const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const db = require("../db");
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/public")));

let port = 5000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
