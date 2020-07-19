document.addEventListener("DOMContentLoaded", function (e) {
    const monsterUrl = "http://localhost:3000/monsters";
    const monsterContainer = document.querySelector("#monster-container");
    const monsterFormContainer = document.querySelector("#create-monster");
    const backButton = document.querySelector("#back")
    const forwardButton = document.querySelector("#forward");
    let page = 0;
    
    const fetchData = () => {
        fetch(monsterUrl)
        .then(response => response.json())
        .then(monsterCollection => {
            getData(monsterCollection)
        });
    };
    fetchData();

    const getData = (dataArray) => {
        monsterContainer.innerHTML = "";

        const firstFifty = dataArray.slice(page * 50, ((page * 50) + 50));
        firstFifty.forEach(monsterObj => {
            renderMonster(monsterObj);
        });
    };
    document.addEventListener("click", (e) => {
        if (e.target === backButton && page != 0) {
            page -= 1;
            fetchData();
        } else if (e.target === forwardButton){
            page += 1;
            fetchData();
        }
    });

    function renderMonster(monster){
        singleMonster = document.createElement("p");
        singleMonster.className = "monster-info";
        singleMonster.innerHTML = `
            <h3> ${monster.name}</h3>
            <p> ${monster.age} </p>
            <p> ${monster.description}</p>
        `;
        monsterContainer.append(singleMonster);
    }


    function createMonster() {
        const monsterForm = document.createElement("form");

        monsterForm.innerHTML = `
            <label> Name: </label>
            <input type="text" name="name">
            <br>
            <label> Age: </label>
            <input type="number" name="age">
            <br>
            <label> Discription: </label>
            <input type="text" name="description">
            <br>
            <input type="submit" value="Create Monster">
        `;
        monsterFormContainer.append(monsterForm);
    }

    const submitHandler = () => {
        document.addEventListener("submit", (e) => {
            e.preventDefault();
            const monsterForm = e.target;
            const name = monsterForm.name.value;
            const age = monsterForm.age.value;
            const description = monsterForm.description.value;
            const monsterObj = {name, age, description};
            monsterForm.reset();

            fetch(monsterUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(monsterObj)
            })
            .then(response => response.json())
            .then(newMonsterObj => {
                renderMonster(newMonsterObj)
            });
            
        });
    };

    submitHandler();
    createMonster();
});