// Fetch

let citiesAndCountries = Promise.all([
  fetch("JSON/land.json").then((response) => response.json()),
  fetch("JSON/stad.json").then((response) => response.json()),
]).then((data) => {
  getData(data[0], data[1]);
  visitCity(data[1]);
  // console.log(data[0],data[1]);
});

// Hämta element från HTML
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let visitedCities = document.getElementById("visitedCities");
let cityId = [];

function saveLocalStorage(city) {
  document.getElementById("saveBtn").addEventListener("click", () => {
    cityId.push(city.id);
    //console.log(totPop);
    localStorage.setItem("cityId", JSON.stringify(cityId));
  });
}

function getData(countries, cities) {
  for (let i = 0; i < countries.length; i++) {
    header.insertAdjacentHTML(
      "beforeend",
      "<h1 id='" + countries[i].id + "'>" + countries[i].countryname + "</h1>"
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
          let city = cities[j];
          let li = document.createElement("li");
          li.innerText = city.stadname;
          li.id = city.id;
          document.getElementById("citiesUl").appendChild(li);

          showInfo(li, city);
        }
      }
      document.title = countries[i].countryname;
    });
  }
}

function showInfo(li, city) {
  // Vid klick på stad visa population i inforuta
  li.addEventListener("click", () => {
    main.innerHTML = "";

    if (
      document.getElementById("infoBox") &&
      document.getElementById("saveBtn")
    ) {
      document.getElementById("infoBox").remove();
      document.getElementById("saveBtn").remove();
    }

    console.log("Population" + " " + city.population);

    let infoBox = document.createElement("section");
    infoBox.id = "infoBox";
    // infoBox.innerText = city.population
    infoBox.innerText = `${city.stadname} har befolkningen: ${city.population}`;

    let saveBtn = document.createElement("button");
    saveBtn.innerText = `Besökt`;
    saveBtn.id = "saveBtn";
    main.append(infoBox, saveBtn);
    saveLocalStorage(city);
    wwFetch(city);
  });
}

function getLocalStorage(city) {
  cityId = JSON.parse(localStorage.getItem("cityId")) || [];
  let totPop = 0;
  for (let i = 0; i < cityId.length; i++) {
    totPop += city[cityId[i] - 1].population;
    let cityNamePrint = document.createElement("p");
    cityNamePrint.innerText = city[cityId[i] - 1].stadname;
    cityNamePrint.id = "cityNamePrint";

    document.getElementById("extraInfo").append(cityNamePrint);
  }
  let totPopPrint = document.createElement("p");
  totPopPrint.id = "totPopPrint";
  if (totPop != 0) {
    totPopPrint.innerText =
      "Den totala populationen av dina besökta städer är: " + totPop;
  } else {
    totPopPrint.innerText = "Du har inga sparade besökta städer";
  }
  document.getElementById("extraInfo").appendChild(totPopPrint);
}

function emptyLocalStorage() {
  document.getElementById("emptyBtn").addEventListener("click", () => {
    cityId = [];
    localStorage.setItem("cityId", JSON.stringify(cityId));
    document.getElementById("extraInfo").innerText = "";
    let print = document.createElement("p");
    print.innerText = "Du har inga sparade besökta städer";
    document.getElementById("extraInfo").appendChild(print);
  });
}

function visitCity(city) {
  visitedCities.addEventListener("click", () => {
    main.innerHTML = "";
    let extraInfo = document.createElement("section");
    extraInfo.id = "extraInfo";

    let emptyBtn = document.createElement("button");
    emptyBtn.innerText = "Rensa";
    emptyBtn.id = "emptyBtn";
    main.append(extraInfo);

    getLocalStorage(city);

    extraInfo.appendChild(emptyBtn);
    emptyLocalStorage();

    document.title = "Besökta städer";
  });
}

function wwFetch(city) {
  Promise.all([
    fetch(
      "https://sv.wikipedia.org/w/rest.php/v1/search/page?q=" +
        city.stadname +
        "&limit=1"
    ).then((response) => response.json()),

    fetch(
      "https://api.weatherapi.com/v1/current.json?key=33a562cc2c244e8e857163551220201&q=" +
        city.stadname +
        "&aqi=no"
    ).then((response) => response.json()),
  ]).then((data) => {
    document.getElementById("infoBox");
    infoBox.innerHTML += `<p>Om staden:  ${data[0].pages[0].description}</p>`;
    infoBox.innerHTML += `<p>Väder: ${data[1].current.temp_c}°C ${data[1].current.temp_f}°F </p>`;
    infoBox.innerHTML += `<img src=${data[1].current.condition.icon}> </img>`;
    infoBox.innerHTML += `<img src= ${data[0].pages[0].thumbnail.url}></img>`;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = data[1].current.condition.icon;

    document.title = city.stadname;
  });
}

// ${data[1].current.condition.text}

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

// Loopar

// Skapa knapp
// Spara id för populationsantal i local storage

// Skapa tömma knapp som kommer fram efter man klickat på Besökta Städer

// function tömma local storage

// Besökta städer knapp
// visa total för populationsantal
