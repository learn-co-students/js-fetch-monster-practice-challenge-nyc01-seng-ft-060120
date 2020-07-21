// - When the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let page = 1
    let pageItems = 50
    const monstersUrl = "http://localhost:3000/monsters"
    const fiftyMonstersURL = `http://localhost:3000/monsters/?_limit=${pageItems}&_pages=${page}`
    // select the container to append each monster div to
    const monsterFormContainer = document.querySelector('#monster-container')
    const monsterCreateContainer = document.querySelector('#create-monster')
    const forwardBtn = document.querySelector('#forward')
    const backBtn = document.querySelector('#back')
    
    

    const fetchMonsters = () => {
        fetch(fiftyMonstersURL)
        .then(response => response.json())
        .then(monsters => monsters.forEach( monster => renderMonster(monster)));
    } // .fetchMonsters



    // for each monster execute this function
    const renderMonster = (monster) => {
        const monsterCard = document.createElement('div')
        monsterCard.className = "card"
        monsterCard.monsterId = monster.id
        monsterCard.innerHTML += 
        `
        <h1>${monster.name}</h1>
        <h2>Age: ${monster.age}</h2>
        <p>${monster.description}</p>
        <h3>${monster.id}</h3>
        `
        monsterFormContainer.append(monsterCard)
    } // .renderMonster

    // submit a new monster
    const createMonster = () => {
        const newMonsterForm = document.createElement('form')

        newMonsterForm.innerHTML = 
        `
        <label>Name: </label>
        <input type="text" name="name">
        <br>
        
        <label>Age: </label>
        <input type="number" name="age">
        <br>
        
        <label>Description: </label>
        <input type="text" name="description">
        <br>

        <input type="submit" value="Create Monster">
        `

        monsterCreateContainer.append(newMonsterForm)
    } // .createMonsterForm

    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            const newMonsterForm = e.target

            const name = newMonsterForm.name.value
            const age = newMonsterForm.age.value
            const description = newMonsterForm.description.value

            const monsterObj = { name, age, description }
            
            newMonsterForm.reset()

            fetch(monstersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }, // headers
                body: JSON.stringify(monsterObj)
            }) // POST
            .then(response => response.json())
            .then(monsterObj => {
                renderMonster(monsterObj)
            }) // resp render monster
        }) // "submit" listener
    } // submitHandler
    

    const fetchMoreMonsters = () => {//?????????????
        document.addEventListener('click', e => {
            if(e.target === forwardBtn) {
                page += 1
                console.log(pageItems)

                // pageItems += 25
                
                fetchMonsters();
                // console.log(page)
                // need to fetch to url
            }
            else if(e.target === backBtn) {
                page -= 1
                
                if (pageItems >= 25){
                    // console.log(pageItems)
                    pageItems -= 25
                }
                
                fetchMonsters();
                // console.log(page)
                // need to fetch to url
            }
        }) // 'click' eventListener
    } // .fetchMoreMonsters






    // {name: "Nyx", age: 2562.999648230398, description: "Cyclopean noisome foetid. Charnel antediluvian gib…s tenebrous. Indescribable unmentionable swarthy.", id: 36}

    /*
        - At the end of the list of monsters, show a button. When clicked, the button
        should load the next 50 monsters and show them.

        - Each page should show 50 monsters

        -Target forward button.
            - On click (set up the document listener), get request for next 50 monsters
                - Fetch GET those monsters (May need to change default button method)

        -Target previous button.
            - On click (set up the document listener), get request for previous 50 monsters
                - Fetch GET those monsters (May need to change default button method)
    */





    submitHandler();
    createMonster();
    fetchMonsters();
    fetchMoreMonsters();
}) // DOM Content Loaded