

var state = {}

//TODO maybe history cause it'll look nice :)
//by that I mean maybe like some basic analytics, how many thing we got
//right, how many wrong, whatever
//
//Turns out the cookie probably cannot store all of this data, so i'll have to 
//find a way how to either store it externally, or scrape the idea
//
//OOOOR pack that shit really hard <3 <3 lets s.e.r.e.a.l.i.z.e
state['history'] = null

state['current'] = {query: null, solution: null}

state['config'] = {
	conjType: 
		{ 	"plain present affirmative": true, 
	   		"plain present negative": true,
			"plain past affirmative": true, 
			"plain past negative": true
		}, 
	vocabList:
		{	
			f17: 
			{
				"1.1": true, 
				"3.1": true
			}
		},
	verbJap: true
}

function bake_cookie(name, value) {
	var cookie = [name, '=', JSON.stringify(value),
		'; '].join('');
	document.cookie = cookie;
}
function read_cookie(name) {
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
}

function getConjInt(stringConj)
{

	if(stringConj === "plain present affirmative")
	{
		return 0;
	}
	else if(stringConj === "plain present negative")
	{
		return 1
	}
	else if(stringConj === "plain past affirmative")
	{
		return 6
	}
	else if(stringConj === "plain past negative")
	{
		return 8
	}
	else
	{
		console.log("Fuck we got an error");
		return -1
	}
}

function generateQuery()
{
	//console.log("generateQuery");
	// TODO get all of the conjugation types in a list, then choose one
	var thisConjList = [];
	Object.keys(state['config']['conjType']).forEach(function(key, index)
	{
		if(state['config']['conjType'][key] == true)
		{
			thisConjList.push(key)
			//console.log(key);
		}
		//console.log(state['config']['conjType'][key] )


	});
	var thisConj = thisConjList[Math.floor(Math.random() * thisConjList.length)];

	// TODO get all of the vocab words in a list, then choose one
	var thisWordList = [];
	for(var set in vocab)
	{
		for(var subset in vocab[set])
		{
			for(var word in vocab[set][subset])
			{
				if(vocab[set][subset][word]['type'] == 'verb')
				{
					//console.log(vocab[set][subset][word]);
					thisWordList.push(vocab[set][subset][word])
				}
			}
		}
	}
	var thisWord = thisWordList[Math.floor(Math.random() * thisWordList.length)];

	console.log("here");
	var bigArray = []
	for(var asdfW in thisWordList)
	{
		var z = module.exports.conjugate(thisWordList[asdfW]['plain'], "plain present affirmative");
		w = thisWordList[asdfW];
		//console.log(z);
		for(var asdfC in thisConjList)
		{
			var aa = thisConjList[asdfC];
			for(cnjIndx in z)
			{
				//console.log(answer[cnjIndx]);
				if(z[cnjIndx]['name'] === aa)
				{
					zz = z[cnjIndx]['form'];
					w[thisConjList[asdfC]] = zz;
				}
			}
			console.log(zz);

		}
		bigArray.push(w);
	}
	console.log(JSON.stringify(bigArray));
	console.log("there");

	console.log(thisWordList)
	console.log(thisWord)

	// TODO now generate the correct word based on the chosen words, and
	// save it in the state, save the cookie, and update the conjQuery query
	
	//For now just do plain form past
	var answer = module.exports.conjugate(thisWord['plain'], "plain present affirmative")
	var answerAnswer = null
	for(cnjIndx in answer)
	{
		//console.log(answer[cnjIndx]);
		if(answer[cnjIndx]['name'] === thisConj)
		{
			answerAnswer = answer[cnjIndx]['form'];
		}
	}
	if(answerAnswer === null)
	{
		console.log("fucking shit something didn't work nerd")
	}
	if(state['config']['verbJap'] === true)
	{
		$('#conjQuery').html("Conjugate " + thisWord['plain'] + " to "+ thisConj+ ".");
	}
	else
	{
		$('#conjQuery').html("Conjugate \"" + thisWord['english'] + "\" to "+ thisConj+ ".");
	}
	state['current']['solution'] = answerAnswer
	console.log(answerAnswer)

}

//Get the state of each button, and use it to update our current state
function updateStateFromBoxes()
{
	console.log(state)
	// console.log($('#plain present affirmative:checked').val());
	
	// Grammar state
	state['config']['conjType']['plain present affirmative'] = 
		$('#plain-present-affirmative').is(":checked");
	state['config']['conjType']['plain present negative'] = 
		$('#plain-present-negative').is(":checked");
	state['config']['conjType']['plain past affirmative'] = 
		$('#plain-past-affirmative').is(":checked");
	state['config']['conjType']['plain past negative'] = 
		$('#plain-past-negative').is(":checked");

	// Vocabulary Set State
	// Vocab fall 2017
	state['config']['vocabList']['f17']['1.1'] = 
		$('#f17m1-1').is(":checked");
	state['config']['vocabList']['f17']['3.1'] = 
		$('#f17m3-1').is(":checked");
	state['config']['verbJap'] = 
		$('#verbJap').is(":checked");

}

// Set the state of all of the buttons to what was in the cookies
function setBoxState()
{
	//console.log(state)
	//console.log(state['config']['conjType']['plain present affirmative']);
	//console.log(state['config']['conjType']['plain present affirmative'] == 
	//		"on" ? true : false);
	// Grammar state
	$('#plain-present-affirmative').prop('checked', 
		state['config']['conjType']['plain present affirmative']);
	$('#plain-present-negative').prop('checked', 
		state['config']['conjType']['plain present negative']);
	$('#plain-past-affirmative').prop('checked', 
		state['config']['conjType']['plain past affirmative']);
	$('#plain-past-negative').prop('checked', 
		state['config']['conjType']['plain past negative'] );

	// Vocabulary Set State
	// Vocab fall 2017
	$('#f17m1-1').prop('checked', 
			state['config']['vocabList']['f17']['1.1']);
	$('#f17m3-1').prop('checked', 
			state['config']['vocabList']['f17']['3.1']);

	$('#verbJap').prop("checked", state['config']['verbJap']);

}

function mainFunc()
{
	//All file loaded
	
	//TODO
	//Load the settings from the cookie if there is one, otherwise keep

	if(read_cookie("conjugate") !== null)
	{
		//TODO when deploying put this statement back in, right now
		//for testing its breaking things
		//state = read_cookie("conjugate")
	}
	else
	{
		bake_cookie("conjugate", state)
	}
	setBoxState()

	// Generate a new query based on default params
	generateQuery()

	//Setup key events on the button
	$('#conjugateBox').keydown(function (event) {
		var keypressed = event.keyCode || event.which;
		if (keypressed == 13) {
			checkBtn()
		}
	});
}

function regenerate()
{
	updateStateFromBoxes();
	generateQuery()
}

function checkBtn()
{
	//get the current state from the check boxes, save it
	//to the cookie
	
	updateStateFromBoxes();

	var thisAttempt = $("#conjugateBox").val();

	if(thisAttempt === state['current']['solution'])
	{
		//TODO we need a cool fucking effect here yo

		//if the guessed word is correct, generate a new word
		generateQuery()

	}
	else
	{
		//TODO make this even cooler
		$("#conjugateBox").effect("shake");
	}


	//Update the state with whatever changed
	bake_cookie("conjugate", state);
}

$(document).ready(function(){
	mainFunc()
});
