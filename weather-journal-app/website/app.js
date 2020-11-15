/* Global Variables */
const APIKey = "&appid=5b9380b4dbee9ed7cb6343df63bca098";
const zipCode = document.querySelector("#zip");
const generatebtn = document.querySelector("#generate");
const feel = document.querySelector("#feelings");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//genrate lisitner
generatebtn.addEventListener("click", async (eve) => {
  eve.preventDefault();
  console.log(zipCode.value);
  const currentData = await getCurrentData(zipCode.value);
  const data = {
    temp: currentData.main.temp,
    feel: feel.value,
    date: newDate,
  };
  await sendData(data);
  const ServerData = await getServerData();
});

//fetch api => GET
const getCurrentData = async (data) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${data}${APIKey}`
    );
    console.log("Success");
    const responseResults = await response.json();
    return responseResults;
  } catch (e) {
    console.log("Error " + e);
  }
};

//Post Data to the server
async function sendData(data) {
  try {
    await fetch("http://localhost:8080/projectData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
}

//get data from the server and update UI
const getServerData = () => {
  try {
    fetch("http://localhost:8080/projectData")
      .then((res) => res.json())
      .then(
        (data) => (
          (temp.innerHTML = data.temp),
          (date.innerHTML = data.date),
          (content.innerHTML = data.feel)
        )
      );
  } catch (e) {
    console.log(e);
  }
};
