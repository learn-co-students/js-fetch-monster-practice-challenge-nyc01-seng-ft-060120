const URL_BASE = 'http://localhost:3000/';
let page = 1;
const limit = 50;

const getMonsters = (p) => {
    let url = URL_BASE+"monsters/?_limit="+limit+"&_page="+p;
    fetch(url)
    .then(response => response.json())
    .then(monsters => {
        console.log(monsters) //now handle monster array
        monsters.forEach(monster => {
            renderMonster(monster);
        });
    })
}

const renderMonster = (monster) => {
    const monsterContainer = document.getElementById('monster-container');
    const div = document.createElement('div');
    div.className = 'monster-box'
    const h3 = document.createElement('h3');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');
    
    h3.innerText = monster.name;
    h5.innerText = 'Age: '+monster.age;
    p.innerText = 'Description: '+monster.description;

    div.appendChild(h3);
    div.appendChild(h5);
    div.appendChild(p);

    monsterContainer.appendChild(div);   
}

const monsterForm = () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const bioInput = document.createElement('input');
    const submit = document.createElement('button');

    form.id = 'monster-form';
    nameInput.id = 'name';
    ageInput.id = 'age';
    bioInput.id = 'description';

    nameInput.placeholder = 'Enter Name';
    ageInput.placeholder = 'Enter Age';
    bioInput.placeholder = 'Enter Description';
    submit.innerHTML = 'Create';

    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(bioInput);
    form.appendChild(submit);

    document.getElementById('create-monster').appendChild(form);

    submitHandler();
}

const submitHandler = () => {
    const form = document.getElementById('monster-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        name = document.getElementById('name').value;
        age = parseFloat(document.getElementById('age').value);
        description = document.getElementById('description').value;

        monster = {
            name,
            age,
            description
        }

        createMonster(monster);
        document.getElementById('monster-form').reset();
    })
}

const createMonster = (monster) => {
    let url = URL_BASE+'monsters';
    fetch(url, {
        method: 'POST',
        headers: { 
            'Content-type':'application/json',
            Accept:'application/json'
        },
        body:JSON.stringify(monster)
    })
    .then(response => response.json())
    .then(monster => console.log('submitted', monster))
}

const navHandler = () => {
    const forward = document.getElementById('forward');
    const back = document.getElementById('back');

    forward.addEventListener('click', () => {
        page++;
        getMonsters(page);
    })

    back.addEventListener('click', () => {
        if (page > 1) {
            page--;
            getMonsters(page);
        } else {
            alert('No Monsters That Way, Silly!');
        }
    })
}

const main = () => {
    getMonsters();
    monsterForm();
    navHandler();
}

document.addEventListener("DOMContentLoaded", main);