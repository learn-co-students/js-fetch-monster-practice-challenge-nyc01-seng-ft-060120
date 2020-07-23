document.addEventListener("DOMContentLoaded", e =>{

    const index = "http://localhost:3000/monsters"
    const body = document.querySelector('body')

    function renderMonster(monster){
        const div = document.createElement('div')
        const container = document.getElementById('monster-container')

        div.innerHTML = `
            <h1>${monster.name}</h1>
            <h3>Age: ${monster.age}</h3>
            <h4>${monster.description}</h4>
            <button>Edit</button>
        `
        container.appendChild(div)

        const editButton = div.querySelector('button')

        editButton.addEventListener("click", e => {
            const monsterForm = document.querySelector('form')
            monsterForm.name.value = monster.name
            monsterForm.age.value = monster.age
            monsterForm.description.value = monster.description
            monsterForm.dataset.id = monster.id
        })



    }

    function renderMonsterArray(monsters){
        monsters.forEach(object =>{
            renderMonster(object)
        })
    }

    fetch(index)
    .then(response => response.json())
    .then(monster => {
        renderMonsterArray(monster)
    })

    function monsterForm(){
        const monsterForm = document.getElementById('create-monster')
        const div = document.createElement('div')
        div.innerHTML = ` 
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
            <label for="age">Age:</label>
            <input type="number" id="age" name="age">
            <label for="age">Description:</label>
            <input type="text" id="desc" name="description">
            <input type="submit" value="Create">
        </form>
        `
        monsterForm.appendChild(div)

    }
    monsterForm()

    document.addEventListener("submit", e =>{
            e.preventDefault()
            const name = e.target.name.value
            const age = e.target.age.value
            const description = e.target.description.value

            const monster = { name, age, description }

            console.log(monster)

            fetch(index,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(monster)
            })
            .then(response => response.json())
            .then(monsterObj => { 
                renderMonster(monsterObj) 
            })

            e.target.reset()  
    })

    document.addEventListener("click", e =>{
        if (e.target.matches("edit")){
            const monId = e.target.id
            console.log(e.target)
        }
    })













})