// console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
  // VARIABLES
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  const dogImageContainer = document.querySelector("#dog-image-container");
  const dogBreeds = document.querySelector("#dog-breeds");
  const breedDropdown = document.querySelector("#breed-dropdown");
  let breedsArray = []

  // EVENT LISTENERS
  dogBreeds.addEventListener('click', changeTextColor);
  breedDropdown.addEventListener('change', filterBreeds);

  // FETCHES
  (function fetchImages() {
    fetch(imgUrl).then(resp => resp.json()).then(addImagesToDOM);
  })();

  (function fetchBreeds() {
    fetch(breedUrl).then(resp => resp.json()).then(addBreedsToDOM);
  })();

  // LOGIC / FUNCTIONALITY
  function addImagesToDOM(data) {
    data.message.forEach(imgURL => {
      dogImageContainer.innerHTML += `
        <img src=${imgURL} />
      `
    });
  }

  function addBreedsToDOM(data) {
    let breeds;
    if(Array.isArray(data)) {
      breeds = data
    } else {
      breeds = Object.keys(data.message);
      breedsArray = breeds;
    };

    dogBreeds.innerHTML = '';

    breeds.forEach(breed => {
      dogBreeds.innerHTML += `
        <li id=${breed}>${breed}</li>
      `
    });
  }

  function changeTextColor(e) {
    e.target.style.color = 'purple';
  }

  function filterBreeds(e) {
    // console.log(e.target.value);
    const filteredBreedsArray = breedsArray.filter(breed => breed.startsWith(e.target.value));
    addBreedsToDOM(filteredBreedsArray);
  }
});
