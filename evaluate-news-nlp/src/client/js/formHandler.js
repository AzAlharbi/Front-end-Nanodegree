const name = document.getElementById("name");
const result = document.getElementById("results");
const confidence = document.querySelector(".confidence");
const subjectivity = document.querySelector(".subjectivity");
const agreement = document.querySelector(".agreement");
function handleSubmit(event) {
  event.preventDefault();

  getCurrentData(name.value);
  //   postData("/NLP", {
  //     url: name.value,
  //   }).then((data) => {
  //     updateUI(data);
  //   });
  //   // check what text was put into the form field
  //   let formText = document.getElementById("name").value;
  //   checkForName(formText);

  //   console.log("::: Form Submitted :::");
  //   fetch("http://localhost:8080/test")
  //     .then((res) => res.json())
  //     .then(function (res) {
  //       document.getElementById("results").innerHTML = res.message;
  //     });
}

const KEY = "80317c4a224ce39b716c97586132a004";

const getCurrentData = async (data) => {
  try {
    const response = await fetch(
      `https://api.meaningcloud.com/sentiment-2.1?key=${KEY}&of=json&txt=${data}&model=general&lang=en`,
      {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Success");
    const responseResults = await response.json();
    console.log(responseResults["agreement"]);
    updateUI(responseResults);
  } catch (e) {
    console.log("Error " + e);
  }
};

export function updateUI(data) {
  agreement.innerHTML = `Agreement :  ${data["agreement"]}`;
  confidence.innerHTML = `Confidence :  ${data["confidence"]}`;
  subjectivity.innerHTML = `Subjectivity : ${data["subjectivity"]}`;
}

export { handleSubmit };
