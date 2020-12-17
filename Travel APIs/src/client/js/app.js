/*
//////
START DECLARE THE APIs
//////
*/

// Geonames API
const geonamesURL = "http://api.geonames.org/searchJSON?maxRows=1&q=";
const geonamesUsername = "ezzhrb";

// weatherbit API
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitKey = "226579b5e04642439422fa9e4e62444e";

// pixabay API
const pixabayURL = "https://pixabay.com/api/?key=";
const pixabayKey = "19496965-288b8814b6bbe7e1ac2a0e37b";

/*
//////
END DECLARE THE APIs
//////
*/

//get the results divs
// const cityNameRes = document.querySelector(".cityName");
// const d = document.querySelector(".date");
// const temp = document.querySelector(".temp");
// const lat = document.querySelector(".lat");
// const img = document.querySelector(".img");

//get the submit
const submit = document.querySelector(".btn-submit");
const result = document.querySelector(".result");

//get the inputs
const city = document.querySelector(".nameInput");
const date = document.querySelector(".dateInput");

export function insert(ev) {
  ev.preventDefault();

  console.log("get the data ..");
  //get the value
  const cityName = city.value;
  const dayDate = date.value;

  getCity(geonamesURL, cityName, geonamesUsername)
    .then((city) => {
      const lat = city.geonames[0].lat;
      const lng = city.geonames[0].lng;
      const weather = getWeather(lat, lng);
      console.log(weather);
      return weather;
    })
    .then((weather) => {
      const data = postData("http://localhost:8008/setData", {
        cityName,
        dayDate,
        weather: weather.data[0].temp,
        lat: weather.lat,
      });
      return data;
    })
    .then((data) => {
      PImage(data);
    });
}

// get pixabay image to update the UI
export const PImage = async (data) => {
  const cityName = data.cityName;
  console.log(cityName);
  const res = await fetch(
    `${pixabayURL}${pixabayKey}&q=${cityName}&city&image_type=photo`
  );

  try {
    const photo = await res.json();

    result.innerHTML = `
    <div class="add">
    <div class="output">
                    <div class="column">
                    <h1>City :</h1>
                    <h1>${data.cityName}</h1>
                    </div>
                    <div class="column">
                    <h1>Date :</h1>
                    <h1>${data.date}</h1>
                    </div>
                    <div class="column">
                    <h1>temperature :</h1>
                    <h1>${data.weather}</h1>
                    </div>
                    <div class="column">
                    <h1>lat :</h1>
                    <h1>${data.lat}</h1>
                    </div>
                    <img class="img" src="${photo.hits[0].largeImageURL}"/>

     </div>
     <button class="btn-delete" onclick="Client.removeTrip()"> Delete </button>
     </div>
    `;
  } catch (error) {
    console.log("error : ", error);
  }
};

// get weather details from lat and long
export const getWeather = async (lat, lng) => {
  const req = await fetch(
    `${weatherbitURL}&lat=${lat}&lon=${lng}&key=${weatherbitKey}`
  );
  try {
    const weather = await req.json();
    return weather;
  } catch (error) {
    console.log("error", error);
  }
};

// get lat and long from the city name
export const getCity = async (url, to, username) => {
  const res = await fetch(`${url}${to}&username=${username}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//post to server
export const postData = async (url, data) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city: data.cityName,
      date: data.dayDate,
      weather: data.weather,
      lat: data.lat,
    }),
  });
  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// add event listener when button clicked
const listenToClick = submit.addEventListener("click", (ev) => {
  insert(ev);
});

// to delete the trip information
export function removeTrip() {
  const add = document.querySelector(".add");
  document.querySelector(".result").removeChild(add);
  console.log("deleted");
}
export { listenToClick };
