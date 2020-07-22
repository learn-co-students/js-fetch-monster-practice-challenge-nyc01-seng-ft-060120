document.addEventListener("DOMContentLoaded", function(){
    
    //GLOBAL VARIABLES 
    let pageNumber = 1
    const baseUrl = "http://localhost:3000/monsters/"
    
    const forwardButton = document.querySelector('#forward')
    const backButton = document.querySelector('#back')


    //FUNCTIONS 
    const getMonsters = () => {
        fetch(baseUrl + `?_limit=50&_page=${pageNumber}`)
        .then(response => response.json())
        .then(monsterData => renderMonsters(monsterData))
    }


    const renderMonster = monster => {
        monsterContainer = document.querySelector('#monster-container')

        monsterDiv = document.createElement("div")
        h2 = document.createElement("h2")
        h4 = document.createElement("h4")
        p = document.createElement("p")

        h2.textContent = monster.name
        h4.textContent = monster.age
        p.textContent = monster.description 

        monsterDiv.append(h2, h4, p)
        monsterContainer.append(monsterDiv)
        
    }

    const renderMonsters = monsterArray => {
        monsterArray.forEach( monster => {
            renderMonster(monster)
        });
    }

    const createMonsterForm = () => {
        
        const createMonster = document.querySelector("#create-monster")
        const monsterForm = document.createElement("form")
        const addMonsterButton = document.createElement("button")
        addMonsterButton.className = "addMonster"

        monsterForm.innerHTML = `
        <label>Name:</label>
        <input type="text" name="name">
        <label>Age:</label>
        <input type="text" name="age">
        <label>Description:</label>
        <input type="text" name="description">
        <input type="submit" value="Add Monster"
        `
        addMonsterButton.textContent = "Add Monster 👹"

        createMonster.append(monsterForm)
        monsterForm.append(addMonsterButton)
    }

    const submitHandler = () => (
        document.addEventListener("submit", function(e){
            e.preventDefault()
            let addMonsterButton = document.querySelector(".addMonster")
            addMonsterButton = e.target

            const name = addMonsterButton.name.value
            const age = addMonsterButton.age.value
            const description = addMonsterButton.description.value 

            const monsterObj = {name, age, description}

            addMonsterButton.reset()
            
            fetch(baseUrl, {
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
    )

    const changePage = () => {
        document.addEventListener("click", function(e){
            
            
            if(e.target === forwardButton){
                pageNumber += 1
                monsterContainer.innerHTML = ""
                getMonsters()

            }
            else if(e.target === backButton){
                
                page -= 1
                monsterContainer.innerHTML = " "
                getMonsters()
                //console.log(pageNumber)
            }
        })
    }

    //EXECUTIONS 
    
    getMonsters()
    createMonsterForm()
    submitHandler()
    changePage()
    
})