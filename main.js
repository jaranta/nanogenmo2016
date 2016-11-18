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

function censor(text) {
	// replaces some characters, but the logic is and picks too small strings
	var startInt = Math.floor(text.length * Math.random());
	for (i = startInt; i < text.length; i++) {
		if (text.charAt(i) == " ") {
			i++;
		}
		else {
			startInt = i;
			break;
		}
	}
	var endInt;
	for (i = startInt; i < text.length; i++) {
		// if this is a white space, stop and return the previous location
		// TODO: Also break at newlines
		if (text.charAt(i) == " ") {
			endInt = i - 1;
			break;
		}
		else if (text.charAt(i) == "\n") {
			endInt = i - 1;
			break;
		}
		i++;
	}
	var redactedChar = "X" // what to replace with
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

output = censor(output);
console.log(output);
