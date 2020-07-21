document.addEventListener("DOMContentLoaded", function() {
    
    const BASEURL = 'http://localhost:3000/'
    const monstersUrl = `${BASEURL}monsters`
    let currentPage = 1
    const forward = document.getElementById("forward")
    console.log(forward)
    const back = document.getElementById("back")

    
    function fetchMonsters() {
        fetch(BASEURL + `monsters/?_limit=50&_page=${currentPage}`)
        .then( res => res.json())
        .then ( monsters => getIndividualMonster(monsters))
    }
    
    function getIndividualMonster(monsters){
        monsters.forEach(monster => renderMonster(monster))
    }
    
    function renderMonster(monster){
        const monsterContainer = document.getElementById('monster-container')
        
        const h2 = document.createElement('h2')
        h2.textContent = monster.name
        
        const h4 = document.createElement('h4')
        h4.textContent = monster.age
        
        const p = document.createElement('p')
        p.textContent = monster.description
        
        monsterContainer.append(h2, h4, p)
    }
    
    function createForm(){
        const newMonsterForm = document.createElement('form')
        newMonsterForm.innerHTML = `
        <label>Name: </label>
        <input type="text" name="name">
        
        <label>Age: </label>
        <input type="text" name="age">
        
        <label>Description: </label>
        <input type="text" name="description">
        
        <input type="submit" value="Create Monster">
        `
        renderForm(newMonsterForm)
    }
    
    function renderForm(newMonsterForm){
        const createMonsterDiv = document.getElementById("create-monster")
        createMonsterDiv.append(newMonsterForm)
    }
    
    const submitHandler = () => {
            document.addEventListener("submit", e => {
                    e.preventDefault()
                    const newMonsterForm = (e.target)
                    console.log("click")
                    const name = newMonsterForm.name.value
                    const age = newMonsterForm.age.value
                    const description = newMonsterForm.description.value
                    const monsterObj = {name, age, description}
                    
                    newMonsterForm.reset()
                    
                    fetch('http://localhost:3000/monsters/', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "appllication/json"
                        },
                        body: JSON.stringify(monsterObj)
                    })
                    .then( res => res.json() )
                    .then( monster => renderMonster(monster))
                })
        }

    function changePage() {
        document.addEventListener("click", function(e){
            if (e.target === forward){
                currentPage = currentPage + 1
                fetchMonsters()
            } else if (e.target === back) {
                currentPage = currentPage - 1
                fetchMonsters()
            }
        })
    }


    createForm()
    changePage()
    submitHandler()
    fetchMonsters()
})