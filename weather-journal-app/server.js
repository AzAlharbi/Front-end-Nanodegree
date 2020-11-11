// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

//require body-parser
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

/* ******* Routes *******   */

//get
app.get("/projectData", (req, res) => {
  res.json(projectData);
});

app.post("/projectData", (req, res) => {
  const feel = req.body.feel;
  const temp = req.body.temp;
  const date = req.body.date;
  projectData = { feel: feel, temp: temp, date: date };
  res.json(projectData);
});
// ******* end *******

// *******Setup Server*******
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
