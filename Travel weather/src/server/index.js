//start define the express , body-parser , and cors
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

/* ******* Routes *******   */

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

APIdata = {};

app.post("/setData", async function (req, res) {
  const cityName = req.body.city;
  const date = req.body.date;
  const weather = req.body.weather;
  const lat = req.body.lat;
  APIdata = {
    cityName: cityName,
    date: date,
    weather: weather,
    lat: lat,
  };
  console.log("Success");
  res.send(APIdata);
});

// *******Setup Server*******
// designates what port the app will listen to for incoming requests
app.listen(8008, function () {
  console.log("Example app listening on port 8008!");
});
