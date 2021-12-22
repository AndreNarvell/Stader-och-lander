// Fetch

let citiesAndCountries = Promise.all([
  fetch("JSON/land.json").then((response) => response.json()),
  fetch("JSON/stad.json").then((response) => response.json()),
]).then((data) => {
  teams(data[0], data[1]);
  // console.log(data[0],data[1]);
});

// Hämta element från HTML
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");

let creatUl;
let li;

function teams(countries, cities) {
  for (let i = 0; i < countries.length; i++) {
    header.insertAdjacentHTML(
      "afterbegin",
      '<h1 id="' + countries[i].id + '">' + countries[i].countryname + "</h1>"
    );

    document.getElementById(countries[i].id).addEventListener("click", () => {
      if (document.getElementById("citiesUl")) {
        document.getElementById("citiesUl").remove();
      }

      let citiesUl = document.createElement("ul");
      citiesUl.id = "citiesUl";
      header.appendChild(citiesUl);

      for (let j = 0; j < cities.length; j++) {
        if (countries[i].id === cities[j].countryid) {
          li = document.createElement("li");
          li.innerText = cities[j].stadname;
          document.getElementById("citiesUl").appendChild(li);
        }
      }
    });
  }
}

// function removeList(list) {
//   while (list.hasChildNodes()) {
//     list.removeChild(list.firstChild);
//   }
// }

// const menuBtn = document.querySelector('#menu');
// menuBtn.addEventListener('click', () => {
//   menuBtn.classList.toggle('open');
// });

// Skapa menyn i header
// ul med li för Sverige
// ul med li för Norge
// ul med li för Finland

// Vid klick på stad visa population i inforuta

// Loopar

// Skapa knapp
// Spara id för populationsantal i local storage

// Skapa tömma knapp som kommer fram efter man klickat på Besökta Städer

// function tömma local storage

// Besökta städer knapp
// visa total för populationsantal
