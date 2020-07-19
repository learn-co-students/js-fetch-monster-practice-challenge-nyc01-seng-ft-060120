document.addEventListener('DOMContentLoaded', () => {
  const monsterContainerElement = document.getElementById('monster-container');
  const createMonsterContainer = document.getElementById('create-monster');
  const nextPageButton = document.getElementById('forward');
  const previousPageButton = document.getElementById('back');
  const monsterForm = createMonsterForm();

  var currentPage = 0;
  var maxDataLength;
  const maxResults = 50;
  const url = "http://localhost:3000/monsters";

  // Events
  nextPageButton.addEventListener('click', () => {updateCurrentPage(1)});
  previousPageButton.addEventListener('click', () => {updateCurrentPage(-1)});
  monsterForm.addEventListener('submit', createMonster);

  fetchMonsters();

  function fetchMonsters() {
    monsterContainerElement.innerHTML = "";
    fetch(url).then((response) => {return response.json()})
    .then((data) => {
      // Split the returning data into sets of 50 results and update the number of monsters
      maxDataLength = Math.floor(data.length / maxResults);
      data = data.slice(currentPage * maxResults, (currentPage + 1) * maxResults);
      data.forEach((monster) => {
        loadMonster(monster)
      });
    })
  }
  function loadMonster(monster) {
    // Create the elements needed for the new monsters
    const nameElement = document.createElement('h1');
    const ageElement = document.createElement('p');
    const descriptionElement = document.createElement('p');

    nameElement.textContent = monster.name;
    ageElement.textContent = monster.age;
    descriptionElement.textContent = monster.description;

    monsterContainerElement.append(nameElement, ageElement, descriptionElement);
  }

  function updateCurrentPage(newPageNumber) {
    // Update the current page and keep it within bounds
    newPageNumber = currentPage + newPageNumber;
    if (newPageNumber < 0 || newPageNumber > maxDataLength) {
      alert("Woops! No results to show!")
    } else {
      currentPage = newPageNumber;
      fetchMonsters();
    }
  }

  function createMonsterForm() {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const submitButton = document.createElement('button');

    // Set the correct properties for the input elements
    submitButton.textContent = "Submit";
    nameInput.placeholder = "Name";
    descriptionInput.placeholder = "Description";
    ageInput.type = "number";
    ageInput.min = 0;

    ageInput.name = "age";
    nameInput.name = "name";
    descriptionInput.name = "description";

    form.append(nameInput, ageInput, descriptionInput, submitButton);
    createMonsterContainer.appendChild(form)
    return form;
  }
  function createMonster(event) {
    event.preventDefault();

    const name = monsterForm.name.value;
    const age = monsterForm.age.value;
    const description = monsterForm.description.value;

    // Make the fetch call and update the database
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({name, age, description})
    })

    // Update the monsters showing
    monsterForm.reset();
    fetchMonsters();
  }
})
