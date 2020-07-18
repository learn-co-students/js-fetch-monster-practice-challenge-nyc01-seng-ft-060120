document.addEventListener('DOMContentLoaded', (e) => {

    const monsterContainer = document.querySelector('#monster-container')
    const monsterFormContainer = document.querySelector('#create-monster')
    const monstersURL = 'http://localhost:3000/monsters'
    const backButton = document.querySelector('#back')
    const frontButton = document.querySelector('#forward')
    var page = 0
    fetchMonsters()

function fetchMonsters() {
    fetch(monstersURL)
    .then(response => response.json())
    .then(monstersObject => {
        getMonsters(monstersObject)
    })
}
    
    function getMonsters(monstersArray) {
        monsterContainer.innerHTML = ``
        let firstFifty = monstersArray.slice(page * 50, ((page * 50) + 50))
        firstFifty.forEach(monster => {
            renderMonster(monster)
        })
    }

    document.addEventListener('click', (e) => {    
        if (e.target === backButton && page != 0) {
            page -= 1
            fetchMonsters()
        } else if (e.target === frontButton) {
            //show the next 50 monsters
            page += 1
            fetchMonsters()
        }
    })

    function renderMonster(monster) {
        const oneMonster = document.createElement('p')
        oneMonster.className = 'monster-card'
        oneMonster.innerHTML = `
            <h3>${monster.name}</h3>
            <p>${monster.age}</p>
            <p>${monster.description}</p> 
        `
        monsterContainer.append(oneMonster)
    }

    function createMonster() {
        const monsterForm = document.createElement('form')
        monsterForm.innerHTML = `
            <label> Name: </label>
            <input type='text' name='name'>
            <br>
            <label> Age: </label>
            <input type='number' name='age'>
            <br>
            <label> Description: </label>
            <input type='text' name='description'>
            <input type='submit' value='Create Monster'>
        `
        monsterFormContainer.append(monsterForm)

    }

    function submitHandler(){
        document.addEventListener('submit', (e) => {
            e.preventDefault()
            const monsterForm = e.target
            const name = monsterForm.name.value
            const age = monsterForm.age.value
            const description = monsterForm.description.value
            const monsterObj = { name, age, description }
            monsterForm.reset()
            fetch(monstersURL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json" 
                },
                body: JSON.stringify(monsterObj)
            })
            .then(response => response.json())
            .then(newMonsterObj => {
                renderMonster(newMonsterObj)
            })
        })
    }

    submitHandler()
    createMonster()
})