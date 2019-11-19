const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "root",
  database: "cows"
});

connection.connect(err => {
  err ? console.log(err) : console.log("connected");
});

module.exports = connection;
