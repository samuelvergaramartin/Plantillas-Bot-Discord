const { red, blue, green } = require('colors');
const { readdirSync, readFileSync } = require('fs');
async function eventsLoader(bot) {
    const { readdirSync, readFileSync } = require('fs');
    const Files = readdirSync("./src/events/");

    for (let index = 0; index < Files.length; index++) {
        const file = Files[index];
        const fileName = Files[index].split(".")[0];
        const extension = Files[index].split(".")[1];

        if(extension == "js") {
            try {
                const event = require(`../../events/${fileName}`);

                if(event.name && event.activated) {
                    if(event.once) {
                        bot.once(event.name, (...args) => event.run(bot, ...args));
                    }
                    else {
                        bot.on(event.name, (...args) => event.run(bot, ...args));
                    }
                } 
            } 
            catch (error) {
                console.log(error);
            }
            
        }
    }
}

module.exports  = eventsLoader;