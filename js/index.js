document.addEventListener('DOMContentLoaded', () => {
    const url = "http://localhost:3000/monsters"
    const createMonster = document.getElementById('create-monster');
    const monsterContainer = document.getElementById('monster-container');
    const backButton = document.getElementById('back')
    const frontButton = document.getElementById('forward')
    const monsterForm = createMonsterForm()
    let pageNum = 1

    fetchMonsters()

    function fetchMonsters() {
        fetch(url + `?_limit=50&_page=${pageNum}`)
        .then(response => response.json() )
        .then( monsters => renderMonsters(monsters))
    }

    function renderMonsters(monsters) {
        monsters.forEach( monster => {
            renderMonster(monster)
        });
    }

    function renderMonster(monster) {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2> ${monster.name} </h2>
            <h4> ${monster.age} </h4>
            <p> ${monster.description} </p>
            `
        monsterContainer.appendChild(div)
    }

    function createMonsterForm() {
        const form = document.createElement('form');
        const nameInput = document.createElement('input');
            nameInput.name = "name"
            nameInput.placeholder = "Name...";
        const ageInput = document.createElement('input');
            ageInput.name = "age"
            ageInput.placeholder = "Age..."
            ageInput.type = "number";
            ageInput.min = 0; 
        const descriptionInput = document.createElement('input');
            descriptionInput.name = "description"
            descriptionInput.placeholder = "Description...";
        const submitButton = document.createElement('button');
            submitButton.id = "submit"
            submitButton.textContent = "Submit";
        
        
        form.append(nameInput, ageInput, descriptionInput, submitButton);
        createMonster.appendChild(form)
        return form;
    }

    const submitMonster = document.addEventListener('submit', function(e) {
        e.preventDefault()
        let submitButton = document.getElementById('submit')
            submitButton = e.target 

            const name = monsterForm.name.value; 
            const age = monsterForm.age.value; 
            const description = monsterForm.description.value; 
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({name, age, description})
            })
        
            monsterForm.reset();
            fetchMonsters();
    })

    function updatePage(PageNum) {
        document.addEventListener('click', function(e) {
            if(e.target === frontButton) {
                pageNum += 1
                monsterContainer.innerHTML = ""
                fetchMonsters()
            }
            else if(e.target === backButton) {
                pageNum -= 1
                monsterContainer.innerHTML = ""
                fetchMonsters()
            }
        })
    }

    updatePage()
        
})

// When a new monster is submitted the page should not reload, and the monster should be added to the end of the list. 
// when page loads set so I can only see 50 per page 
// buttons to change page 