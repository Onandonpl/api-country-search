const endpoint = "https://restcountries.eu/rest/v2/all";
const searchInput = document.querySelector(".search");
const countriesDiv = document.querySelector(".countries");
const letters = document.querySelector(".letters");
const countries = [];
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    countries.push(...data);
    console.log(data);
  });

generateLetters = () => {
  alphabet.map((letter) => {
    const newLetter = document.createElement("div");
    newLetter.classList.add("letter");

    newLetter.innerText = letter;
    newLetter.dataset.letter = letter;

    letters.appendChild(newLetter);
  });
};

selectCountryByFirstLetter = (e) => {
  const letter = e.target.dataset.letter;

  const letterCountry = countries
    .map((country) => {
      let lowerName = country.name.toLowerCase();
      const firstLetter = lowerName[0];
      if (firstLetter === letter) {
        return `
        <div class="country">
        <div class="country__flag"><img src="${country.flag}"  alt="" /></div>
        <div class="country__information">
          <div class="country__name">
            <span class="name">Name: ${country.name}</span>
          </div>
          <div class="country__capital">Capital: ${country.capital}</div>
          <div class="country__population">Population: ${country.population}</div>
        </div>
      </div>
      `;
      }
    })
    .join("");
  countriesDiv.innerHTML = letterCountry;
};

findMatches = (wordToMatch, countries) => {
  return countries.filter((country) => {
    const regex = new RegExp(wordToMatch, "gi");
    return country.name.match(regex);
  });
};

function displayMatches() {
  const matchArray = findMatches(this.value, countries);
  const html = matchArray
    .map((country) => {
      const regex = new RegExp(this.value, "gi");
      const countryName = country.name.replace(
        regex,
        `<span class="matched">${this.value}</span>`
      );

      return `
      <div class="country">
      <div class="country__flag"><img src="${country.flag}" alt="" /></div>
      <div class="country__information">
        <div class="country__name">
          <span class="name">Name: ${countryName}</span>
        </div>
        <div class="country__capital">Capital: ${country.capital}</div>
        <div class="country__population">Pupulation: ${country.population}</div>
      </div>
    </div>
    `;
    })
    .join("");
  countriesDiv.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
letters.addEventListener("click", selectCountryByFirstLetter);
window.onload = generateLetters;
