const { botfolder } = require('../../data/socket/socket.json');
const { readdirSync } = require('fs');
const color = require('colors');
async function slashcommandLoader(botname) {

    console.log(`(/) Cargando SlashCommands`.yellow);//file of commandFiles
    botname.slashCommands.clear();
        botname.slashArray = [];
        const commandFolders = readdirSync(`./container/${botfolder}/src/slashcommands`);
        for (const folder of commandFolders) {
            const commandSubFolders = readdirSync(`./container/${botfolder}/src/slashcommands/${folder}`);
            for (const subFolders of commandSubFolders) {
                const commandFiles = readdirSync(`./container/${botfolder}/src/slashcommands/${folder}/${subFolders}`).filter((file) => file.endsWith(".js"));
                for(const file of commandFiles) {
                    const NOMBRE_COMANDO_ERRONEO = file.split('\\').pop().split('/').pop().split(".")[0];
                    try {
                        const command = await require(`../../slashcommands/${folder}/${subFolders}/${file}`);
                        if (command.CMD.name) {
                            botname.slashCommands.set(command.CMD.name, command);
                            console.log(`(+) SlashCommand: ${command.CMD.name}`.blue + ` [ ` + `OK`.green + ` ]`);
                            botname.slashArray.push(command.CMD); 
                    } else {
                        continue;
                    }
                    }
                    catch (e) {
                        console.log(`(-) SlashCommand: ${NOMBRE_COMANDO_ERRONEO}`.blue + ` [ ` + `ERROR`.red + ` ]`);
                        //console.log(e);
                }
                }
            }
        }

        console.log(`(+) ${botname.slashCommands.size} SlashCommands cargados`.green);
}

module.exports = slashcommandLoader;