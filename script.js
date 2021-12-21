// Fetch 

let citiesAndCountries = Promise.all([
  fetch("JSON/land.json").then((response) => response.json()),
  fetch("JSON/stad.json").then((response) => response.json()),
]).then((data) => {
  return data;
});

console.log("C&C", citiesAndCountries);

// Hämta element från HTML

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
