

var state = {}

//TODO maybe history cause it'll look nice :)
//by that I mean maybe like some basic analytics, how many thing we got
//right, how many wrong, whatever
state['history'] = null

state['current'] = {query: null, solution: null}

state['config'] = {
	conjType: 
		{ 	"plain-present-affirmative": true, 
	   		"plain-present-negative": true,
			"plain-past-affirmative": true, 
			"plain-past-negative": true
		}, 
	vocabList:
		{	
			f17: 
			{
				"1.1": true, 
				"3.1": true
			}
		}
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

function generateQuery()
{
	// TODO get all of the conjugation types in a list, then choose one

	// TODO get all of the vocab words in a list, then choose one
	var thisWordlist = [];
	for(var set in vocab)
	{
		for(var subset in vocab[set])
		{
			for(var word in vocab[set][subset])
			{
				if(vocab[set][subset][word]['type'] == 'verb')
				{
					//console.log(vocab[set][subset][word]);
					thisWordlist.push(vocab[set][subset][word])
				}
			}
		}
	}
	var thisWord = thisWordlist[Math.floor(Math.random() * thisWordlist.length)];

	console.log(thisWordlist)
	console.log(thisWord)

	// TODO now generate the correct word based on the chosen words, and
	// save it in the state, save the cookie, and update the conjQuery query
	
	//For now just do plain form past
	var answer = module.exports.conjugate(thisWord['plain'], "plain affirmative")
	console.log(answer[5])

	$('#conjQuery').html("Conjugate " + thisWord['plain'] + " to plain present negative.");
	state['current']['solution'] = answer[5]['form']
	console.log(answer[5]['form'])

}

//Get the state of each button, and use it to update our current state
function updateStateFromBoxes()
{
	console.log(state)
	// console.log($('#plain-present-affirmative:checked').val());
	
	// Grammar state
	state['config']['conjType']['plain-present-affirmative'] = 
		$('#plain-present-affirmative').is(":checked");
	state['config']['conjType']['plain-present-negative'] = 
		$('#plain-present-negative').is(":checked");
	state['config']['conjType']['plain-past-affirmative'] = 
		$('#plain-past-affirmative').is(":checked");
	state['config']['conjType']['plain-past-negative'] = 
		$('#plain-past-negative').is(":checked");

	// Vocabulary Set State
	// Vocab fall 2017
	state['config']['vocabList']['f17']['1.1'] = 
		$('#f17m1-1').is(":checked");
	state['config']['vocabList']['f17']['3.1'] = 
		$('#f17m3-1').is(":checked");

}

// Set the state of all of the buttons to what was in the cookies
function setBoxState()
{
	//console.log(state)
	//console.log(state['config']['conjType']['plain-present-affirmative']);
	//console.log(state['config']['conjType']['plain-present-affirmative'] == 
	//		"on" ? true : false);
	// Grammar state
	$('#plain-present-affirmative').prop('checked', 
		state['config']['conjType']['plain-present-affirmative']);
	$('#plain-present-negative').prop('checked', 
		state['config']['conjType']['plain-present-negative']);
	$('#plain-past-affirmative').prop('checked', 
		state['config']['conjType']['plain-past-affirmative']);
	$('#plain-past-negative').prop('checked', 
		state['config']['conjType']['plain-past-negative'] );

	// Vocabulary Set State
	// Vocab fall 2017
	$('#f17m1-1').prop('checked', 
			state['config']['vocabList']['f17']['1.1']);
	$('#f17m3-1').prop('checked', 
			state['config']['vocabList']['f17']['3.1']);

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

	//TODO Generate a new query (or maybe grab the last one the user used)
	generateQuery()

	//Setup key events on the button
	$('#conjugateBox').keydown(function (event) {
		var keypressed = event.keyCode || event.which;
		if (keypressed == 13) {
			checkBtn()
		}
	});
}


function checkBtn()
{
	//get the current state from the check boxes, save it
	//to the cookie
	
	updateStateFromBoxes();

	//TODO here is where we actually do the checking stuff
	var thisAttempt = $("#conjugateBox").val();

	//TODO Check if the guessed word is correct
	if(thisAttempt === state['current']['solution'])
	{
		//TODO if the guessed word is correct, generate a new word
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
