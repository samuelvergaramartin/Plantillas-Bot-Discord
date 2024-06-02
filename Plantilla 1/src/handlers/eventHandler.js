const {readdirSync} = require('fs');
const path = require('path');

async function eventHandler(botname){

    const dirPath = path.resolve(__dirname, '../events');
    //const dirPath = path.resolve(__dirname, '/home/container/botname/src/events');
    const Files = readdirSync(dirPath)
    .filter((file) => file.endsWith('js'))
    .map(async(file) => {
        const event = require(`../events/${file}`);
        //const event = require(`/home/container/botname/src/events/${file}`);

        if (event.once) {
            botname.once(event.name, (...args) => event.execute(botname, ...args));
        } else {
            botname.on(event.name, (...args) => event.execute(botname, ...args));
        }
    });
};

module.exports = eventHandler;