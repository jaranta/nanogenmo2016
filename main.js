var tracery = require('tracery-grammar');

var spyMissions = require('./grammar.json');
var namelist = require('./names.json');

var grammar = tracery.createGrammar(spyMissions);
var names = tracery.createGrammar(namelist);

grammar.addModifiers(tracery.baseEngModifiers); 

var result = grammar.flatten('#origin#');

var output = 
	"TOP SECRET \n\n" + 
	"Memorandum for: " + names.flatten('#fullname#') + "\n\n" + 
	"December 12th, 1943 \n\n" +
	result + "\n\n" +
	"Signed by,\n" + names.flatten('#fullname#') + 
	"\n\nTOP SECRET";

console.log(output);
