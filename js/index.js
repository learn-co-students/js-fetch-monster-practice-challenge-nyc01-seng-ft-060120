document.addEventListener('DOMContentLoaded', () => {
	const url = "http://localhost:3000/monsters/" 
	let displayMonsterLimit = 50
	let displayMonsterpage = 1
	const monsterContainer = document.getElementById('monster-container')
	const backButton = document.getElementById("back")
	const forwardButton = document.getElementById("forward")

	console.log(backButton, forwardButton)

//fetch monsters
	// fetch(url+`/?_limit=${displayMonsterLimit}&_page=${displayMonsterpage}`)
	// .then(resp => resp.json())
	// .then(monster => monster.forEach(monster => {
	// 	renderMonster(monster)
	// }))

	const renderMonster = (monster) => {
		const monsterCard = document.createElement('div')
		monsterCard.innerHTML = `
		<h1> ${monster.name} </h1>
		<h4> ${monster.age} </h4> 
		<p> ${monster.description}</p>
		`
		monsterContainer.append(monsterCard)
	}

		document.addEventListener('click', e => {
			if(e.path[0] === backButton){
				displayMonsterLimit = displayMonsterLimit -= 50
				fetch(url+`/?_limit=${displayMonsterLimit}&_page=${displayMonsterpage}`)
				.then(resp => resp.json())
				.then(monster => monster.forEach(monster => {
					renderMonster(monster)
				}))
			}
			if(e.path[0] === forwardButton){
				fetch(url+`/?_limit=${displayMonsterLimit+=50}&_page=${displayMonsterpage+=1}`)
				.then(resp => resp.json())
				.then(monster => monster.forEach(monster => {
					renderMonster(monster)
				}))			}
		})


})


//render 50 monsters

//button to render 50 more monsters 
//_limit=[number] - limit the number of monsters returned
//GET http://localhost:3000/monsters/?_limit=50&_page=3
