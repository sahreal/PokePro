const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("../db");
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/client/public")));

// app.get("/cows", (req, res) => {
//   let sql = "SELECT * FROM cow";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log("error", err);
//       res.sendStatus(500);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post("/cows", (req, res) => {
//   let data = req.body;
//   let values = [data.cowName, data.description];
//   let sql = "INSERT INTO cow(cowName, description) VALUES(?,?) ";
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });

let port = 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
