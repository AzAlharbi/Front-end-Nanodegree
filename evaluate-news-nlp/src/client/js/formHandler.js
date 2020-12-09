const confidence = document.querySelector(".confidence");
const subjectivity = document.querySelector(".subjectivity");
const agreement = document.querySelector(".agreement");
const irony = document.querySelector(".irony");

//handel the click event
function handleSubmit(event) {
  event.preventDefault();

  const url = document.getElementById("name").value;
  if (Client.URLChecker(url)) {
    console.log("passed");
    getCurrentData("http://localhost:8008/sentiment", {
      url: url,
    }).then((data) => updateUI(data));
  } else {
    console.log("ther are somthimg wrong with your URL: " + url);
  }
}

async function getCurrentData(URL, data) {
  const response = await fetch(URL, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const responseResults = await response.json();
    console.log("Success");
    console.log(responseResults);
    return responseResults;

    //updateUI(responseResults);
  } catch (e) {
    console.log("Error " + e);
  }
}

export function updateUI(data) {
  agreement.innerHTML = `Agreement :  ${data["agreement"]}`;
  confidence.innerHTML = `Confidence :  ${data["confidence"]}`;
  subjectivity.innerHTML = `Subjectivity : ${data["subjectivity"]}`;
  irony.innerHTML = `Irony : ${data["irony"]}`;
}

export { handleSubmit };
