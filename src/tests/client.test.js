const Bot = require('../core/client/client');
const token = require('../data/token/token');
const testBot = new Bot();

function checkIfIntentsAreLoaded() {
    if(testBot.options.intents > 0) return true;
    else return false;
}

function checkIfTokenIsProvided() {
    if(token && token != "" && token != null) return true;
    else return false;
}

test('Carga de intents en el Cliente', () => {
    expect(checkIfIntentsAreLoaded()).toBe(true);
});

test('Token proporcionado en el cliente', () => {
    expect(checkIfTokenIsProvided()).toBe(true);
});