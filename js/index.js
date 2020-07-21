document.addEventListener("DOMContentLoaded", function(){

    getMonsters();
    createMonster();

    function getMonsters(){
        fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
        .then(r => r.json())
        .then(monsters => showMonsters(monsters))
    }

    function showMonsters(monsters){
        monsters.forEach(monster => {
        const monstCont = document.querySelector("#monster-container")
        let monstDiv = document.createElement('div')
        monstDiv.innerHTML = `
        <h2>Name: ${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>`
        monstCont.append(monstDiv)
        })
    }

    function createMonster(){
    const newMonstDiv = document.querySelector("#create-monster")
    const newMonstForm = document.createElement('form')
    newMonstForm.id = "formData"
    newMonstForm.innerHTML = `
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <label for="age">Age:</label><br>
    <input type="text" id="age" name="age"><br>
    <label for="description">Bio:</label><br>
    <input type="text" id="description" name="description">
    <input type='submit' id="Create-Monster" name="Create Monster" value="Create Monster">`
    newMonstDiv.append(newMonstForm)
    }

    // const subBtn = document.querySelector("#Create-Monster")
    document.getElementById('formData').addEventListener('submit', formData);
        function formData(e){
            e.preventDefault();
            let name = document.getElementById('name').value;
            let age = document.getElementById('age').value;
            let description = document.getElementById('description');
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: 
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name:name, age:age, description:description
            })
        })
        .then(response => response.json())
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err));
        document.getElementById('formData').reset()
    }

    // document.getElementById('forward').addEventListener('click', (e)=>{
    //     fetch('http://localhost:3000/monsters/?_start51&_limit=50&_page=2')
    //     .then(r => r.json())
    //     .then(monsters => showMonsters(monsters))
    // })
})