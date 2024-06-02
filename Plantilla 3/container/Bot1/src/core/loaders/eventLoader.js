const LoadFiles = require('./fileLoader');
const { readdirSync } = require('fs');
const path = require('path');
async function loadEvents(botname) {
    botname.files = new LoadFiles(botname);
    console.log(`(/) Cargando eventos`.yellow);

    botname.removeAllListeners();
    let eventArray = [];

    const dirPath = path.resolve(__dirname, '../../events');
    //const dirPath = path.resolve(__dirname, '/home/container/botname/src/events');
    const Files = readdirSync(dirPath)
    .filter((file) => file.endsWith('js'))
    .map(async(file) => {
        const NOMBRE_EVENTO = file.split('\\').pop().split('/').pop().split(".")[0];
        try {
            const event = require(`../../events/${file}`);

            if (event.once) {
                botname.once(event.name, (...args) => event.execute(botname, ...args));
                console.log(`(+) Evento: ${NOMBRE_EVENTO}`.blue + ` [ ` + `OK`.green + ` ]`);
            } else {
                botname.on(event.name, (...args) => event.execute(botname, ...args));
                console.log(`(+) Evento: ${NOMBRE_EVENTO}`.blue + ` [ ` + `OK`.green + ` ]`);
            }
            eventArray.push(event);
        }
        catch (e) {
            console.log(`(-) Evento: ${NOMBRE_EVENTO}`.blue + ` [ ` + `ERROR`.red + ` ]`);
            //console.log(e);
        }
    });
    console.log(`(+) ${eventArray.length} Eventos Cargados`.green);
}

module.exports = loadEvents;