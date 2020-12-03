const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

// var textapi = new AYLIENTextAPI({
//   application_key: process.env.API_KEY,
// });

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve("src/client/views/index.html"));
});

// app.post("/NLP", function (req, res) {
//   textapi.sentiment({ url: req.body.url }, (error, response) => {
//     if (error === null) res.send(response);
//     else console.log(error);
//   });
// });
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
