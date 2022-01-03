class Dice {
	constructor(number) {
		this.number = number
	}
	roll() {
		return Math.floor(Math.random() * this.number)
	}
}

const images = ['./images/rock.png', './images/paper.png', './images/scissors.png']
const dice = new Dice(3)
let wins = 0
let loses = 0
let ties = 0
const winsDisplay = document.getElementById('wins')
const losesDisplay = document.getElementById('loses')
const tiesDisplay = document.getElementById('ties')
const battleContainer = document.querySelector('.battle-container')
const btns = document.querySelectorAll('.btn-img')
const winMsg = document.getElementById('win')
const loseMsg = document.getElementById('lose')
const tieMsg = document.getElementById('tie')
const resetBtn = document.getElementById('reset')

for (let i = 0; i < btns.length; i++) {
	function handleClick() {
		btns[i].addEventListener('click', (e) => {
			startGame(btns)
			const user = createUserChoice(e.target)
			renderVersus()
			const computer = createComputerChoice()
			setTimeout(() => evaluateBattle(user, computer), 1700)
		})
	}
	handleClick()
}

resetBtn.addEventListener('click', () => {
	reset(btns, battleContainer)
	updateScoreBoard()
})

function startGame(btns) {
	btns.forEach((el) => (el.style.pointerEvents = 'none'))
}

function createUserChoice(element) {
	const userChoice = element.getAttribute('id')
	const userChoiceImage = document.createElement('img')

	userChoiceImage.src = `./images/${element.src.split('/').pop()}`
	battleContainer.appendChild(userChoiceImage)

	return userChoice
}

function createComputerChoice() {
	const computerChoice = dice.roll()
	const computerChoiceImage = document.createElement('img')

	computerChoiceImage.src = images[computerChoice]
	setTimeout(() => {
		battleContainer.appendChild(computerChoiceImage)
	}, 1000)
	return computerChoice
}

function renderVersus() {
	const vs = document.createElement('img')
	vs.src = './images/versus.png'
	vs.setAttribute('id', 'versus')
	setTimeout(() => {
		battleContainer.appendChild(vs)
	}, 500)
}

function evaluateBattle(p1, p2) {
	// rock
	if (p1 === '0') {
		switch (p2) {
			case 0:
				tieMsg.style.display = 'unset'
				ties += 1
				break
			case 1:
				loseMsg.style.display = 'unset'
				loses += 1
				break
			case 2:
				winMsg.style.display = 'unset'
				wins += 1
				break
		}
	}
	// pape
	if (p1 === '1') {
		switch (p2) {
			case 0:
				winMsg.style.display = 'unset'
				wins += 1
				break
			case 1:
				tieMsg.style.display = 'unset'
				ties += 1
				break
			case 2:
				loseMsg.style.display = 'unset'
				loses += 1
				break
		}
	}
	// scissor
	if (p1 === '2') {
		switch (p2) {
			case 0:
				loseMsg.style.display = 'unset'
				loses += 1
				break
			case 1:
				winMsg.style.display = 'unset'
				wins += 1
				break
			case 2:
				tieMsg.style.display = 'unset'
				ties += 1
				break
		}
	}
	setTimeout(() => (resetBtn.style.display = 'unset'), 500)
}

function reset(btns, container) {
	container.innerHTML = ''
	btns.forEach((el) => (el.style.pointerEvents = 'auto'))
	winMsg.style.display = 'none'
	loseMsg.style.display = 'none'
	tieMsg.style.display = 'none'
	resetBtn.style.display = 'none'
}

function updateScoreBoard() {
	winsDisplay.textContent = `wins: ${wins}`
	losesDisplay.textContent = `loses: ${loses}`
	tiesDisplay.textContent = `ties: ${ties}`
}
