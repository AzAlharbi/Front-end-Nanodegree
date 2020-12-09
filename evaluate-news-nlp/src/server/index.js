const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve("src/client/views/index.html"));
});

const URL = "https://api.meaningcloud.com/sentiment-2.1?";
const apiKey = process.env.API_KEY;
APIdata = {};

app.post("/sentiment", async function (req, res) {
  const usrURL = req.body.url;
  const apiURL = `${URL}key=${apiKey}&url=${usrURL}&lang=en`;

  const response = await fetch(apiURL);
  const responseResults = await response.json();
  console.log("Success");
  const agreement = responseResults.agreement;
  const confidence = responseResults.confidence;
  const subjectivity = responseResults.subjectivity;
  const irony = responseResults.irony;
  APIdata = {
    agreement: agreement,
    confidence: confidence,
    subjectivity: subjectivity,
    irony: irony,
  };

  console.log("Success ");
  res.send(APIdata);
});
// designates what port the app will listen to for incoming requests
app.listen(8008, function () {
  console.log("Example app listening on port 8008!");
});
