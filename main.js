var tracery = require('tracery-grammar');

var grammar = require('./grammar.json');
var nameList = require('./names.json');

var grammar = tracery.createGrammar(grammar);
var names = tracery.createGrammar(nameList);

grammar.addModifiers(tracery.baseEngModifiers); 

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getNames(prefix, min, max) {
    var namesText = "";
    var nameNumber = Math.floor((Math.random() * max) + min);
    for (i = 0; i < nameNumber; i++) {
    namesText += prefix + names.flatten('#fullname#') + "\n";
    }
    return namesText;
}

function getAttachements(min, max) {
    var attachementText = "";
    var attachementNumber = Math.floor((Math.random() * max) + min);
    for (i = 0; i < attachementNumber; i++) {
    attachementText += "* " + grammar.flatten('#attachement#') + " (" + (i + 1) + ")" + "\n";
    }
    return attachementText;
}

function censor(text, censoredStringsAmount) {
	// TODO: Don't gopple up carriage returns
	// TODO: Define minimum length to avoid censoring prepositions etc.
	// Maybe make the breaking point "." to censor whole sentences?
	var randomInt;
	var startInt;
	var endInt;
	var redactedChar = "X"; // what to replace with
	randomInt = Math.floor(text.length * Math.random());
	for (i = randomInt; i < text.length; i++) {
		if (text.charCodeAt(i) == 32) {
			startInt = i + 1;
			break;
		}
	}
	for (i = startInt; i < text.length; i++) {
		if (text.charCodeAt(i) == 32) {
			endInt = i; 
			break;
		}
		else if (text.charCodeAt(i) == 13) { // TODO: Check if \n = carriage return?
			endInt = i - 1;
			break;
		}
	}
	return text.replace(text.substring(startInt, endInt), redactedChar.repeat(endInt - startInt));
}

var output =
	"# Subject: Operation report for PROJECT " + grammar.flatten('#codenames#') + "\n\n" +
	"Memorandum for:\n\n" + getNames("* ", 1,5) + "\n\n" + 
	randomDate(new Date(1900, 0, 1), new Date()).toDateString() + "\n\n" +
	grammar.flatten('#background#') + "\n\n" +
	grammar.flatten('#mission#') + "\n\n" +
	grammar.flatten('#result#') + "\n\n" +
	grammar.flatten('#conclusion#') + "\n\n" +
	"See the following attachements:" + "\n\n" + getAttachements(1,3) + "\n\n" +
	"Signed by,\n\n" + getNames("",1,1) + "\n\n" +
	"Classified by " + grammar.flatten('#agencies#') + "\n\n";

output = censor(output, 6);
console.log(output);
