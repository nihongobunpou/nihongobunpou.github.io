console.log(sentenceData);

var state = {}

state['question'] = null
state['answer'] = null

var correct = 0;
var wrong = 0;

function checkBox( question )
{
	var thisAttempt = $("#inputBox" + question).val();
	if(thisAttempt === state['answer'][question])
	{
		wrong = 0;
		$("#input" + question).html(state['answer'][question]);
		console.log("true");

		correct += 1;
		if(correct >= state['answer'].length)
		{
			var f= $('<button id="next" onclick="genNewQuery()">Next</button>');
			$("#theSent").append(f);
		}
	}
	else
	{
		wrong += 1;
		$("#inputBox" + question).effect("shake");
		if(wrong > 3)
		{
			var r= $('<button id="showAns" onclick="showans()">Show Answer</button>');
			$("#theSent").append(r);
		}
		console.log("false");
	}
	console.log(correct);
	console.log(state['answer']);
	console.log(thisAttempt);

}

function genQuery(block)
{
	var questionString = block['question'][0];
	var answerString = [];
	console.log(block);
	for(question in block['answer'])
	{
	//	console.log(parseInt(question) + 1);
	//	console.log(block['question'][question + 1]);
		questionstart = "<b id=\"input" + question + "\">";
		questionbox = "<input id=\"inputBox" + question +
			"\" type=\"text\" onsubmit=\"return checkBox(" + question + ")\">";
		questionend = "</b>";
		questionsub = "<button id=\"checkAns" + question + "\" onclick=\"checkBox(" + question + ")\">Check</button>";
		questioninput = questionstart + questionbox + questionsub + questionend;
		questionString += questioninput + "(" + block['answer'][question][0] + ")" + block['question'][parseInt(question) + 1];
		console.log('#inputBox' + question);
		answerString.push(block['answer'][question][1]);
	}

	var returnThing = {}
	returnThing['question'] = questionString;
	returnThing['answer'] = answerString;

	return returnThing;

}
function showans()
{
	var g= $('<br><div>' + state['answer'] + '</div>');
	var f= $('<button id="next" onclick="genNewQuery()">Next</button>');
	$("#theSent").append(g);
	$("#theSent").append(f);
}

function genNewQuery()
{

	wrong = 0;
	correct = 0;
	var thisBlock = sentenceData[Math.floor(Math.random() * sentenceData.length)];

	sentence = genQuery(thisBlock);
	state = sentence;

	$("#theSent").html(sentence['question']);
	for(question in state['answer'])
	{
		$('#inputBox' + question).keydown(function (event) {
			console.log("test");
			var keypressed = event.keyCode || event.which;
			if (keypressed == 13) {
				checkBox(question);
			}
		});
	}
}

function mainFunc()
{

	genNewQuery();

}

$(document).ready(function(){
	mainFunc()
});
