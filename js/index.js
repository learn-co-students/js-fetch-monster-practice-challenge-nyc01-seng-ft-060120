document.addEventListener("DOMContentLoaded", () => {
fetchMonsters()
const monsterContainer = document.getElementById('monster-container')
const createMonster = document.getElementById('create-monster')
const backButton = document.getElementById('back')
const forwardButton = document.getElementById('forward')
let page = 1

function fetchMonsters(page) {
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(function(response){
  return response.json();
  })
  .then(function(json){
  json.forEach(monster => makeMonsterDiv(monster))
})
}


   function makeMonsterDiv(monster) {
       const monsterDiv = document.createElement('div');
       monsterDiv.id = monster.id
       monsterDiv.innerHTML = `
       <h2>${monster.id}. ${monster.name}</h2>
       <h4>Age: ${monster.age}</h4>
       <p>Bio: ${monster.description}</p>
       `
       monsterContainer.append(monsterDiv)
   }

   function makeForm() {
       const monsterForm = document.createElement('form')
       monsterForm.id = "monster-form"
       monsterForm.innerHTML = `
       <input id="name" name="name" placeholder="name...">
       <input id="age" name="age" placeholder="age...">
       <input id="description" name="description" placeholder="description...">
       <button>Create</button>
       `
       createMonster.append(monsterForm)
   }

      makeForm()

    const monsterForm = document.getElementById('monster-form')

    monsterForm.addEventListener("submit", function(e){
    e.preventDefault();
    const data = {
      "name": monsterForm.name.value,
      "age": monsterForm.age.value,
      "description": monsterForm.description.value
    }

    fetch ("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
  
      .then(response => response.json())
      .then(monster => {
        makeMonsterDiv(monster)
      })
      monsterForm.reset(); 
    }
    
  )

  document.addEventListener('click', function(e) {
    if (e.target === backButton) {
       goBack();
    }
    if (e.target === forwardButton){
       goForward();
    }
})

function goBack() {
    if (page > 1) {
        page--
        fetchMonsters(page)
    }
}

function goForward() {
    page++
    fetchMonsters(page)
}

  





   


}) // DOMContendLoaded end