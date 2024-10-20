const { red, blue, green, yellow } = require('colors');
const { readdirSync } = require('fs');

let files;
let fileName;
let extension;
let event;

async function eventsLoader(bot, showErrors) {

    files = readdirSync("./src/events/");

    console.log(yellow("(/) Cargando eventos"));

    function showEventLoaded(event) {
        console.log(blue(`(+) Evento: ${event.name} `) + "[ " + green("OK") + " ]");
    }

    function loadEvent(event) {
        if(event.name && event.activated) {
            if(event.once) {
                bot.once(event.name, (...args) => event.run(bot, ...args));
                showEventLoaded(event);
            }
            else {
                bot.on(event.name, (...args) => event.run(bot, ...args));
                showEventLoaded(event);
            }
        }
    }

    function showEventFailed(event) {
        if(event.name) console.log(blue(`(-) Evento: ${event.name} `) + "[ " + red("ERROR") + " ]");
    }

    for (let i = 0; i < files.length; i++) {

        fileName = files[i].split(".")[0];
        extension = files[i].split(".")[1];

        if(extension == "js") {
            try {
                event = require(`../../events/${fileName}`);

                if(event) {
                    if(!showErrors) {
                        if(!event.run) showEventFailed(event);
                        else loadEvent(event);
                    }
                    else loadEvent(event);
                }
                else {
                    showErrors = true;
                    throw new Error("event is undefined");
                }
                
            } 
            catch (error) {
                if(event) showEventFailed(event);
                if(showErrors) console.log(error);
            }
        }
    }
}

module.exports  = eventsLoader;