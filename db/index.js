const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "root",
  database: "PokePro"
});

connection.connect(err => {
  err ? console.log(err) : console.log("connected");
});

module.exports = connection;
