console.log("Wow!")

let resultsList = document.getElementById("results-span")
let submitButton = document.getElementById("submit")
let communique = document.getElementById("communiques")

submitButton.addEventListener("click", processRes)

let isValid = true

var fishMap = {
	"A": 3,
	"B": 1,
	"C": 0,
	"D": 1,
	"E": 4,
	"F": 3,
	"G": 1,
	"H": 3,
	"I": 1,
	"J": 0,
	"K": 3,
	"L": 2,
	"M": 4,
	"N": 3,
	"O": 0,
	"P": 1,
	"Q": 1,
	"R": 2,
	"S": 0,
	"T": 2,
	"U": 0,
	"V": 2,
	"W": 4,
	"X": 2,
	"Y": 3,
	"Z": 3
}

var cansMap = {
	"A": 0,
	"B": 2,
	"C": 1,
	"D": 1,
	"E": 0,
	"F": 0,
	"G": 1,
	"H": 0,
	"I": 0,
	"J": 1,
	"K": 0,
	"L": 0,
	"M": 0,
	"N": 0,
	"O": 1,
	"P": 1,
	"Q": 1,
	"R": 1,
	"S": 1,
	"T": 0,
	"U": 1,
	"V": 0,
	"W": 0,
	"X": 0,
	"Y": 0,
	"Z": 0
}



function processRes() {
	let str2 = document.getElementById("input-textbox").value.match(/[A-Za-z]/g).join('').toUpperCase()
	if (str2.length < 4) {
		console.log("No way!")
		communique.innerHTML = "<b>" + str2 + "</b> is too short!"

	} else {

		validateWord(str2)
	}
	document.getElementById("input-textbox").value = ""
}

document.getElementById("input-textbox").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        submitButton.click();
    }
})

function scoreWord(word) {
	var fishCount = 0
	var canCount = 0
	for (var i = 0; i < word.length; i++) {
		var chosenLetter = fishMap[word[i]]
		fishCount = fishCount + chosenLetter

		var chosenCanLetter = cansMap[word[i]]
		canCount = canCount + chosenCanLetter
	}
	return [fishCount, canCount]
}

function validateWord(str2) {
	fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+str2)
    .then(response => {
        if (response.ok) {
	    return response.json();
	  }
    })
    .catch(error => {
    	console.log("Woop!")
    	isValid = false
    })
    .then(word => {
        var singleWordDefinition = word[0].meanings[0].definitions[0].definition;
        console.log("SINGLE: " + singleWordDefinition)

        if (singleWordDefinition.length > 0) {
        	isValid = true
        }


        console.log("It worked!")
        console.log(str2)
			scoreWord(str2)

			var node = document.createElement('li')
			node.appendChild(document.createTextNode(str2 + ": " + String(scoreWord(str2)[0]) + "🐟, " + String(scoreWord(str2)[1]) + "🥫"))

			// Attach to the beginning of the list
			const list = document.getElementById("myList");
			list.insertBefore(node, list.children[0])
			communique.innerHTML = "<b>"+str2+"</b> got you " + String(scoreWord(str2)[0]) + " fish and " + String(scoreWord(str2)[1]) + " cans!"
    })
}


