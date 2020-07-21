const url = 'http://localhost:3000/monsters'
let page = 1

const backBttn = document.querySelector('#back')
const fwdBttn = document.querySelector('#forward')
const createDiv = document.querySelector('#create-monster')
const renderedMonsters = document.querySelector('#monster-container')

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
createDiv.appendChild(form)

const fetchMonsters = () => {
    return fetch(`${url}/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => renderMosters(data))
}

const renderMosters = (data) => {
    data.forEach(monster => renderMonster(monster))
}

const renderMonster = (monster) => {
    let div = document.createElement('div')
    div.innerHTML = `
    <h2>${monster.name}</h3>
    <h3>Age: ${monster.age}</h3>
    <p>${monster.description}</p>
    `
    renderedMonsters.appendChild(div)
}



document.addEventListener('DOMContentLoaded', () => {
    fetchMonsters()
})

fwdBttn.addEventListener('click', (e) => {
    renderedMonsters.innerHTML = '';
    page++;
    console.log(page)
    fetchMonsters()
})

backBttn.addEventListener('click', (e) => {
    renderedMonsters.innerHTML = '';
    if (page > 1){page--};
    console.log(page)
    fetchMonsters()
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        headers:{
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            name: form[0].value,
            age: form[1].value,
            description: form[2].value
        })
    }).then(res => res.json)
    .then(data => console.log(data))
})