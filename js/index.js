const SUBMIT_URL = "http://localhost:3000/";
let pageNum = 1;
const fetchMonsters = (pageNum) => {
  const monstersUrl =
    SUBMIT_URL + `monsters/?_limit=50&_page=${pageNum}`;
  fetch(monstersUrl)
    .then((response) => response.json())
    .then((monsters) => {
      renderMonsters(monsters);
    });
};

const renderMonsters = (monsters) => {
  monsters.forEach(monster => {
    console.log(monster),
    createMonsterCard(monster)});
};

const createMonsterCard = (monster) => {
  const monsterContainer = document.querySelector("#monster-container");
  for (let property in monster) {
    if (property === "name") {
      const monsterName = document.createElement("h2");
      monsterName.innerHTML = `${monster[property]}`;
      monsterContainer.appendChild(monsterName);
    } else if (property === "age") {
      const monsterAge = document.createElement("h4");
      monsterAge.innerHTML = `Age: ${monster[property]}`;
      monsterContainer.appendChild(monsterAge);
    } else if (property === "description") {
      const monsterDescription = document.createElement("p");
      monsterDescription.innerHTML = `Bio: ${monster[property]}`;
      monsterContainer.appendChild(monsterDescription);
    }
  }
};

const addSubmitEventListener = () => {
  let form = document.querySelector("#monster-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("hello", getFormData()),
      postNewMonster(getFormData()),
      clearForm();
  });
};

const getFormData = () => {
  let newMonsterForm = document.querySelector("#monster-form");
  let name = newMonsterForm.name.value;
  let age = newMonsterForm.age.value;
  let description = newMonsterForm.description.value;
  return { name, age, description };
};

const postNewMonster = (newMonster) => {
  let postUrl = SUBMIT_URL + `monsters`,
    request = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(newMonster),
    };
  fetch(postUrl, request)
    .then((response) => response.json())
    .then((newMonster) => console.log("new monster", newMonster));
};

const clearForm = () => {
  document.querySelector("#monster-form").reset();
};

const addNavListeners = () => {
  let back = document.querySelector("#back");
  let forward = document.querySelector("#forward");
  back.addEventListener("click", () => {
    pageBack();
  }),
    forward.addEventListener("click", () => {
      pageForward();
    });
};
const pageBack = () => {
  pageNum > 1 ? (pageNum--, fetchMonsters(pageNum)) :
  alert('can\'t go back further');
};

const pageForward = () => {
  pageNum++, fetchMonsters(pageNum)
};

const init = () => {
  fetchMonsters(), addNavListeners(), addSubmitEventListener();
};

document.addEventListener("DOMContentLoaded", init);
