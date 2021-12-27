// Fetch

let citiesAndCountries = Promise.all([
  fetch("JSON/land.json").then((response) => response.json()),
  fetch("JSON/stad.json").then((response) => response.json()),
]).then((data) => {
  getData(data[0], data[1]);
  // console.log(data[0],data[1]);
});

// Hämta element från HTML
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let visitedCities = document.getElementById("visitedCities");

function getData(countries, cities) {
  for (let i = 0; i < countries.length; i++) {
    header.insertAdjacentHTML(
      "beforeend",
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
          let city =cities[j]
          let li = document.createElement("li");
          li.innerText = city.stadname;
          li.id = city.id;
          document.getElementById("citiesUl").appendChild(li);
          
          showInfo(li,city);
        }
      }
    });
  }
}

function showInfo(li, city) {
  // Vid klick på stad visa population i inforuta
  li.addEventListener("click", () => {
    main.innerHTML = ""

    if (document.getElementById("infoBox") && document.getElementById("saveBtn")) {
      document.getElementById("infoBox").remove();
      document.getElementById("saveBtn").remove();
    }
 
    console.log("Population" + " " + city.population);

    let infoBox = document.createElement("section")
    infoBox.id = "infoBox"
    // infoBox.innerText = city.population
    infoBox.innerText = `${city.stadname} har befolkningen: ${city.population}`

    let saveBtn = document.createElement("button");
    saveBtn.innerText = `Besökt`
    saveBtn.id = "saveBtn"
    main.append(infoBox, saveBtn);
  });
}

visitedCities.addEventListener("click", () => {
  main.innerHTML = ""
  let extraInfo = document.createElement("section")
  extraInfo.id = "extraInfo"
  extraInfo.innerText = `Hej`
  
  let emptyBtn = document.createElement("button");
  emptyBtn.innerText = `Tömma local Storage`
  emptyBtn.id = "emptyBtn"
  main.append(extraInfo)
  extraInfo.appendChild(emptyBtn)
  
})



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
