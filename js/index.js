document.addEventListener("DOMContentLoaded", () => {

    const monsterContainer = document.getElementById('monster-container')
    const createMonster = document.getElementById('create-monster')
    const forwardButton = document.getElementById('forward') 
    const backButton = document.getElementById('back')   

    let page = 1

    function fetchMonsters(page){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())    
        .then(monsters => getIndividualMonster(monsters))
        
        }
    function getIndividualMonster(monsters){
            monsters.forEach(monster => {
            renderMonster(monster)})
        }  
    function renderMonster(monster){
            monsterDiv = document.createElement('div')
            monsterDiv.id = monster.id  
            monsterH2 = document.createElement('h2')
            monsterH2.innerText = monster.name
            monsterH4 = document.createElement('h4')
            monsterH4.innerText = monster.age
            monsterP = document.createElement('p')
            monsterP.innerText = monster.description
            monsterDiv.append(monsterH2, monsterH4, monsterP)
            monsterContainer.append(monsterDiv)

    } 
    function makeForm(){
        const masterForm = document.createElement('form')
        masterForm.id = "master-form"
        masterForm.innerHTML = `
        <label> Monster Name: </label>
        <br>
        <input id="name" name="name">
        <br>
        <label> Age: </label>
        <br>
        <input id="age" name="age">
        <br>
        <label> Bio: </label>
        <br>
        <input id="description" name="description">
        <button>Create</button>
        `
        createMonster.append(masterForm)
    }



    fetchMonsters()
    makeForm()
    forwardButtonListener()
    const monsterForm = document.querySelector('form')
    formListener()

    


    function formListener(){
        monsterForm.addEventListener("submit", function(e){
            e.preventDefault();
            const dataForCreation = {
                "name": monsterForm.name.value,
                "age": monsterForm.age.value,
                "description": monsterForm.description.value
            }
            fetch('http://localhost:3000/monsters', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify(dataForCreation)
            })
            .then(response => response.json())
            .then(monster => {
            renderMonster(monster)
        })
        monsterForm.reset();
        })
       
    }

    function forwardButtonListener(){
        forwardButton.addEventListener("click", function(e){
            page++
            fetchMonsters(page)
        })
    }
    

        
})

   

  
    






