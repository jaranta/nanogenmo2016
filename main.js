var tracery = require('tracery-grammar');

var spyMissions = require('./grammar.json');

var grammar = tracery.createGrammar(spyMissions);

grammar.addModifiers(tracery.baseEngModifiers); 

console.log(grammar.flatten('#origin#'));
