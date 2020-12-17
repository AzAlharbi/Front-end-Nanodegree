const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
///////////END///////////

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/test", function (req, res) {
  res.status(200).json({ done: "done" });
});

module.exports = app;
