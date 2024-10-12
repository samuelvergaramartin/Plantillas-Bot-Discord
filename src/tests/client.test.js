const Bot = require('../core/client');
const testBot = new Bot();

function checkIfIntentsAreLoaded() {
    if(testBot.options.intents > 0) return true;
    else return false;
}

test('Carga de intents en el Cliente', () => {
expect(checkIfIntentsAreLoaded()).toBe(true);
});