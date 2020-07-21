// √1. Show the first 50 monsters of the API
    // a. Make a fetch to get the data
    // b. Set up a loop that will only run 50 times to create each monster
    // c. Within the loop, build a div that contains an h2 for name, an h4 for "Age:", and a p for bio. All of these should be 
        // placed within the 'monster-container'
// 2. Send information submitted by the form to the API to add a monster, and add it to the list
    // Build form using JS
    // Build an event listener for the submit field, prevent default
    // After default prevented, build POST request using FETCH to submit to the API
// 3. Display next or previous 50 monsters when you press the forward and back button
    // set up a counter for our loop to indicate position 
    // if forward is pressed, start from counter to 50 additional
    // if backword is pressed, decrement counter by 50 and then show those. 
document.addEventListener("DOMContentLoaded", function() {

    const MONSTER_URL = "http://localhost:3000/monsters";
    const monsterList = document.getElementById('monster-container');
    const formContainer = document.getElementById('create-monster');

    let monsterCounter = 0;

    function buildForm() {
        const monsterForm = document.createElement('form');
        monsterForm.setAttribute('id', "monster-form");
        monsterForm.innerHTML = `
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button type="submit">Create</button>
        `;
        formContainer.append(monsterForm);
    }

    function getMonsters() {
        fetch(MONSTER_URL)
            .then(resp => resp.json())
            .then(json => displayMonsters(json));
    };

    function displayMonsters(object) {
        for(let i = monsterCounter; i < monsterCounter + 50; i++) {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
            <h2>${object[i]["name"]}</h2>
            <h4>Age: ${object[i]["age"]}</h4>
            <p>Bio: ${object[i]["description"]}</p>
            `;
            monsterList.append(monsterDiv);
        }
        monsterCounter = monsterCounter + 50;
    }

    function addMonster(event) {
        event.preventDefault();
        let formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            description: document.getElementById('description').value
        }
        let configObj = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(formData)
        }
        fetch(MONSTER_URL, configObj)
            .catch((error) => {
                console.log(error)
            })
        event.target.reset()
    }

    function backAndForth(event) {
        if (event.target.id === "forward") {
            monsterList.innerHTML = ''
            getMonsters()
        } else if (event.target.id === "back" && monsterCounter !== 50) {
            monsterCounter = monsterCounter - 100
            monsterList.innerHTML = ''
            getMonsters()
        }
    }

    buildForm();
    getMonsters();

    const newMonster = document.getElementById('monster-form');

    newMonster.addEventListener('submit', addMonster);

    document.addEventListener('click', backAndForth);


})