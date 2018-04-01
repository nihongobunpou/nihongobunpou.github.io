//How this format works: 
//Construct a sentence with blanks, with each blank having a hint, such as:
// some sentence ______ (hint for the blank) some more sentence ___ (hint2) sent
// Each part of the sentence should go in the question array. 
// Each [hint, answer] pair should go in the answer section
// You should have num(answers) answers, and num(answers) + 1 elements in question. 
var sentenceData = 
[
	{
		question: ["昨日、海は", "です。"], 
		answer: [["blue", "あおなかった"]]
	}, 
	{
		question: ["メリーさんは", "、", "です。"], 
		answer: [["lovely, cute", "かわいくて"], ["kind", "やさし"]]
	}, 
	{
		question: ["子どもの時、私はピアノが", "です。"], 
		answer: [["not good at", "じょうずじゃない"]]
	}, 
	{
		question: ["高校の時、たけしさんは", "が", "ですか。"], 
		answer: [["study", "べんきょうするの"], ["good at", "じょうず"]]
	}, 
	{
		question: ["このTシャツは", "ます。"], 
		answer: [["too big", "おおきすぎ"]]
	}, 
	{
		question: ["あたまがとても", "です。それから、ねつが", "です。"], 
		answer: [["painful", "いたいん"], ["fever", "ある"]]
	}, 
	{
		question: ["今日はたくさん", "よ。"], 
		answer: [["give advice", "ねたほうがいいです"]]
	}, 
	{
		question: ["先週に日本語のテストは", "です。", "先生は私は", "と言います。"], 
		answer: [["not good", "よくない"], ["therefore", "だから"],
		["please study", "べんきょうしてください"]]
	}, 
	{
		question: ["たくさんぼうしがありますね。", "は", "が",
		"です。私は", "です。"], 
		answer: [["red", "あかいの"], ["beautiful", "きれい"],
		["most expensive", "いちばんたかい"], ["do not want to buy", "かいたくない"]]
	}, 
	{
		question: ["この人はめがねを", "、", "、とてもかわいいです。"],
		answer: [["wear", "かけていて"], ["high school student", "しょうがくせいで"]]
	}
]
