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
		answer: [["blue", "あおかった"]]
	}, 
	{
		question: ["メリーさんは", "、", "です。"], 
		answer: [["lovely, cute", "かわいくて"], ["kind", "やさし"]]
	}, 
	{
		question: ["子どもの時、私はピアノが", "でしたか。"], 
		answer: [["not good at", "とくいじゃなかった"]]
	}, 
	{
		question: ["メリーさん：高校の時、たけしさんは", "が", "か。\n 私：はい、", "よ。"], 
		answer: [["study", "べんきょうするの"], ["good at", "じょうずでした"], ["good at", "じょうずでした"]]
	}, 
	{
		question: ["このTシャツは", "ます。"], 
		answer: [["too big", "おおきすぎ"]]
	}, 
	{
		question: ["先生：メリーさん、どうしたんですか。\n メリさん：あたまがとても", "です。それから、ねつが", "です。"], 
		answer: [["painful", "いたいん"], ["fever", "あるん"]]
	}, 
	{
		question: ["今日はたくさん", "よ。"], 
		answer: [["give advice to sleep", "ねたほうがいいです"]]
	}, 
	{
		question: ["先週の日本語のテストは", "です。", "先生は私は", "と言っていました。"], 
		answer: [["not good", "よくなかった"], ["therefore", "だから"],
		["please study", "べんきょうしてください"]]
	}, 
	{
		question: ["たくさんぼうしがありますね。", "は", "が",
		"です。だから、私は", "です。"], 
		answer: [["red", "あかいの"], ["beautiful", "きれいです"],
		["most expensive", "いちばんたかい"], ["do not want to buy", "かいたくない"]]
	}, 
	{
		question: ["この人はめがねを", "、", "、とてもかわいいです。"],
		answer: [["wear", "かけていて"], ["high school student", "こうこうせいで"]]
	},
	{
		question: ["私は日本語が", "。 そして、日本語の歌が","。"],
		answer: [["can speak", "はなせます"], ["can sing", "うたえます"]]
	},
	{
		question: ["この中国語の文は", "。"],
		answer: [["looks not difficult", "たいへんじゃなさそうです"]]
	},
    {
        question: ["ふじ山に", "こたがあります。"],
		answer: [["have climbed", "のぼった"]]
    },
    {
    	question: ["メリーさん：昨日、ばんごはんのすしは", "ですか。\n たけしさん： いいえ、", "です。"],
		answer: [["expensive", "たかかった"], ["not expensive", "たかくなかった"]]
    },
    {
    	question: ["ルフィはぼうしを", "。それから、パンツを", "。それに、くつを", "。"],
		answer: [["wear", "かぶっています"], ["wear", "はいています"], ["wear", "はいています"]]
    }
]
