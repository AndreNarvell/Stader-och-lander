let citiesAndCountries = Promise.all([
  fetch("JSON/land.json").then((response) => response.json()),
  fetch("JSON/stad.json").then((response) => response.json()),
]).then((data) => {
  return data;
});

console.log("C&C", citiesAndCountries);
