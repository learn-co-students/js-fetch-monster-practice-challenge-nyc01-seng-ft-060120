document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/monsters"
    const monsterCollection = document.getElementById('monster-container')

    function fetchMonsters() {
        fetch(url)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => renderMonster(monster)))
                                 
    }

    function renderMonster(monster) {
        const li = document.createElement('ul')
        li.className = 'li'
        li.id = monster.id
        li.innerHTML +=`
        <h2>${monster.name}</h2>
        <p>${monster.age}</p>
        <p><span>${monster.description}</span></p>
        `
        monsterCollection.append(li)
    }

    function renderForm(){
        const monsterForm = document.createElement("form")
        monsterForm.id = "new-monster"
        monsterForm.innerHTML = 
            `<input id="name" placeholder= "name...">
            <input id="age" placeholder= "age...">
            <input id="description" placeholder="description...">
            <button class="new-btn">Create</button>`
        monsterCollection.append(monsterForm)
    }

    function postMonsters(name, age, description) {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              'name': name,
              'age': age,
              'description': description
            })
          })
          .then(resp => resp.json())
          .then(newMonster => renderMonster(newMonster))
    }

    //event listeners
          document.addEventListener('submit', (event) => {
            event.preventDefault()
          
            let monsterName = document.getElementById('name').value
            let monsterAge = document.getElementById('age').value
            let monsterDescription = document.getElementById('description').value
    
            postMonsters(monsterName, monsterAge, monsterDescription)
            document.getElementById("new-monster").reset();
          })

    fetchMonsters()
    renderForm()

})