console.log(sentenceData);

var state = {}

state['question'] = null
state['answer'] = null

function genQuery(block)
{
	var questionString = block['question'][0];
	var answerString = "";
	console.log(block);
	for(question in block['answer'])
	{
	//	console.log(parseInt(question) + 1);
	//	console.log(block['question'][question + 1]);
		questionString += "_________ (" + block['answer'][question][0] + ")" + block['question'][parseInt(question) + 1];
		answerString += block['answer'][question][1] + "<br>"
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

	var thisBlock = sentenceData[Math.floor(Math.random() * sentenceData.length)];

	sentence = genQuery(thisBlock);
	state = sentence;

	$("#theSent").html(sentence['question']);
	var r= $('<button id="showAns" onclick="showans()">Show Answer</button>');
	$("#theSent").append(r);
}

function mainFunc()
{
	genNewQuery();

}

$(document).ready(function(){
	mainFunc()
});
