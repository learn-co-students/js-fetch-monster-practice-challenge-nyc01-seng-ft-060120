document.addEventListener('DOMContentLoaded', (event) => {

    const monsterUrl =  ('http://localhost:3000/monsters')

    let page = 1
  
    const createMonster  = document.getElementById('create-monster')
  
    const monsterContainer = document.getElementById('monster-container')
    
    const back = document.getElementById('back')
    
    const forward = document.getElementById('forward')

    const form = document.createElement('form')
    const nameField = document.createElement('input')
    nameField.type = 'text'; nameField.name = 'name'
    const ageField = document.createElement('input')
    ageField.type = 'number'; ageField.name = 'age'
    const descriptionField = document.createElement('input')
    descriptionField.type = 'text'; descriptionField.name = 'description';
    const submitBttn = document.createElement('input')
    submitBttn.type = 'submit'; submitBttn.value = 'Create Monster'
    form.appendChild(nameField); form.appendChild(ageField);
    form.appendChild(descriptionField); form.appendChild(submitBttn)
    createMonster.appendChild(form)

    
    
    const fetchMonsters = () => {
        return fetch(`${monsterUrl}/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(data => renderMonsters(data))
        
    }

    const renderMonsters = (data) => {
        data.forEach(monster => renderMonster(monster))
    }   

    const renderMonster = (monster) => {
        let div = document.createElement('div')
        div.innerHTML = `
        <h2>${monster.name}</h3>
        <h3>Age: ${monster.age}</h3>
        <p>${monster.description}</p>
        `
    monsterContainer.appendChild(div)
    }

    forward.addEventListener('click', (e) => {
        monsterContainer.innerHTML = '';
        page++;
        console.log(page)
        fetchMonsters()
    })


    back.addEventListener('click', (e) => {
        monsterContainer.innerHTML = '';
        if (page > 1) {page--};
        console.log(page)
        fetchMonsters()
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(monsterUrl, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                name: form[0].nodeValue,
                age: form[1].nodeValue,
                description:form[2].value
            })
        })
        .then(response => response.json)
        .then(data => console.log(data))

    })

    fetchMonsters();
})