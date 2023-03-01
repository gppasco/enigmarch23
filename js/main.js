console.log("my wiiiiiiife")

function showTip() {
	tip = document.getElementById('timer-tip')
	tip.innerHTML = "To time yourself on this crossword, simply use your phone or another timing device, and hit START when you begin the crossword. Hit STOP when you finish to see your time!"
}

function checkAnswer() {
	const a1 = document.getElementById('A1').value
	const a2 = document.getElementById('A2').value
	const a3 = document.getElementById('A3').value
	const a4 = document.getElementById('A4').value

	const b1 = document.getElementById('B1').value
	const b2 = document.getElementById('B2').value
	const b3 = document.getElementById('B3').value
	const b4 = document.getElementById('B4').value
	const b5 = document.getElementById('B5').value

	const c1 = document.getElementById('C1').value
	const c2 = document.getElementById('C2').value
	const c3 = document.getElementById('C3').value
	const c4 = document.getElementById('C4').value
	const c5 = document.getElementById('C5').value

	const d1 = document.getElementById('D1').value
	const d2 = document.getElementById('D2').value
	const d3 = document.getElementById('D3').value
	const d4 = document.getElementById('D4').value
	const d5 = document.getElementById('D5').value

	const e2 = document.getElementById('E2').value
	const e3 = document.getElementById('E3').value
	const e4 = document.getElementById('E4').value
	const e5 = document.getElementById('E5').value


	const word1 = (a1 + a2 + a3 + a4 == "MATS")
	const word2 = (b1 + b2 + b3 + b4 + b5 == "EMAIL")
	const word3 = (c1 + c2 + c3 + c4 + c5 == "NELLY")
	const word4 = (d1 + d2 + d3 + d4 + d5 == "UNITE")
	const word5 = (e2 + e3 + e4 + e5 == "DAYS")
	
	const isCorrect = (word1 && word2 && word3 && word4 && word5)

	if (isCorrect) {
		var x = document.getElementById('clues-div')
		var y = document.getElementById('wrong')
		correct = document.getElementById('correct')
		x.style.display = "none"
		y.style.display = "none"
		correct.style.display = "block"

	} else {
		var y = document.getElementById('wrong')
		y.innerHTML = `<b><font color="#FF0000">Keep trying!</font></b>`
	}
}