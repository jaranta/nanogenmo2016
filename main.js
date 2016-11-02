var tracery = require('tracery-grammar');

var grammar = require('./grammar.json');
var nameList = require('./names.json');

var grammar = tracery.createGrammar(grammar);
var names = tracery.createGrammar(nameList);

grammar.addModifiers(tracery.baseEngModifiers); 

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getNames(min, max) {
    var namesText = "";
    var nameNumber = Math.floor((Math.random() * max) + min);
    for (i = 0; i < nameNumber; i++) {
    namesText += names.flatten('#fullname#') + "\n";
    }
    return namesText;
}

var output = 
	"TOP SECRET \n\n" +
	"Memorandum for:\n" + getNames(1,5) + "\n\n" + 
    randomDate(new Date(1900, 0, 1), new Date()).toDateString() + "\n\n" +
    "Subject: PROJECT " + grammar.flatten('#codenames#') + "\n\n" +
	grammar.flatten('#origin#') + "\n\n" +
	"Signed by,\n" + getNames(1,1) + "\n\n" +
    "Classified by " + grammar.flatten('#agencies#') + "\n\n" +
	"TOP SECRET";

console.log(output);
