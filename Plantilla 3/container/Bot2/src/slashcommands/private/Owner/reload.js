const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { botfolder } = require('../../../data/socket/socket.json');
const { readdirSync } = require('fs');
const path = require('path');
const LoadFiles = require('../../../core/loaders/fileLoader');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setName('reload')
        .setDescription("Recarga los archivos del bot.")
        .addStringOption(option =>
            option.setName('modulo')
                .setDescription('Recarga un modulo')
                .addChoices(
                    { name: 'Comandos Diagonales', value: 'slash' },
                    { name: 'Eventos', value: 'events' },
                    { name: 'AntiCrash-System', value: 'anticrash' },
                    { name: 'Todos los modulos (reboot completo)', value: 'all'},
                )
                .setRequired(true)),
    async execute(Client, interaction) {
        const netcat = require('../../../core/client/Client');
        const { dev_principal_nombre_id, dev_secundario_nombre_id } = require('../../../data/system_data/system_owners.json');
        if(interaction.user.id !== `${dev_principal_nombre_id}`) {
            if(interaction.user.id !== `${dev_secundario_nombre_id}`) return interaction.reply({ content:"**<a:netcatemojiincorrecto:1080458827054465075> | ERROR:** Usted no es el dueño del bot. Sólo el dueño del bot puede usar este comando.", ephemeral: true});
          }
        let args = [interaction.options.getString("modulo")];
        let opcion = "Comandos, Eventos y Handlers";
        try {
            switch (args[0]?.toLowerCase()) {

                case "slash":
                case "slashcommands": {
                    opcion = "Comandos Slash"
                    

                        console.log(`(/) Cargando SlashCommands`.yellow);//file of commandFiles
                        Client.slashCommands.clear();
                            Client.slashArray = [];
                            const commandFolders = readdirSync(`./container/${botfolder}/src/slashcommands`);
                            for (const folder of commandFolders) {
                                const commandSubFolders = readdirSync(`./container/${botfolder}/src/slashcommands/${folder}`);
                                for (const subFolders of commandSubFolders) {
                                    const commandFiles = readdirSync(`./container/${botfolder}/src/slashcommands/${folder}/${subFolders}`).filter((file) => file.endsWith(".js"));
                                    for(const file of commandFiles) {
                                        const NOMBRE_COMANDO_ERRONEO = file.split('\\').pop().split('/').pop().split(".")[0];
                                        try {
                                            const command = await require(`../../${folder}/${subFolders}/${file}`);
                                            if (command.CMD.name) {
                                                Client.slashCommands.set(command.CMD.name, command);
                                                console.log(`(+) SlashCommand: ${command.CMD.name}`.blue + ` [ ` + `OK`.green + ` ]`);
                                                Client.slashArray.push(command.CMD); 
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
                            console.log(`(+) ${Client.slashCommands.size} SlashCommands cargados`.green);
                    

                }
                    break;

                case "eventos":
                case "events": {
                    opcion = "Eventos"

                    console.log(`(/) Cargando eventos`.yellow);

                    Client.removeAllListeners();
                    let eventArray = [];

                    const dirPath = path.resolve(__dirname, '../../../events');
                    //const dirPath = path.resolve(__dirname, '/home/container/netcat/src/events');
                    const Files = readdirSync(dirPath)
                    .filter((file) => file.endsWith('js'))
                    .map(async(file) => {
                        const NOMBRE_EVENTO = file.split('\\').pop().split('/').pop().split(".")[0];
                        try {
                            const event = require(`../../../events/${file}`);

                            if (event.once) {
                                Client.once(event.name, (...args) => event.execute(Client, ...args));
                                console.log(`(+) Evento: ${NOMBRE_EVENTO}`.blue + ` [ ` + `OK`.green + ` ]`);
                            } else {
                                Client.on(event.name, (...args) => event.execute(Client, ...args));
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
                    break;

                case "anticrash": {
                    opcion = "AntiCrash-System"

                    Client.files = new LoadFiles(Client);
                    console.log(`(/) Cargando AntiCrash-System`.yellow);

                        const RUTA_ARCHIVOS = await Client.files.loadFiles(`/container/${botfolder}/src/core/AntiCrash-System`);

                        if (RUTA_ARCHIVOS.length) {
                            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                                try {
                                    require(rutaArchivo)(Client);
                                } catch (e) {
                                    console.log(`(-) AntiCrash-System `.blue + `[ ` + `ERROR`.red + ` ]`);
                                    //console.log(e);
                                }
                            })
        }

        console.log(`(+) AntiCrash-System `.blue + `[ ` + `OK`.green + ` ]`);
                }
                    break;

                default: {
                    console.log(`(/) Cargando SlashCommands`.yellow);//file of commandFiles
                        Client.slashCommands.clear();
                            Client.slashArray = [];
                            const commandFolders = readdirSync(`./container/${botfolder}/src/slashcommands`);
                            for (const folder of commandFolders) {
                                const commandSubFolders = readdirSync(`./container/${botfolder}/src/slashcommands/${folder}`);
                                for (const subFolders of commandSubFolders) {
                                    const commandFiles = readdirSync(`./container/${botfolder}/src/slashcommands/${folder}/${subFolders}`).filter((file) => file.endsWith(".js"));
                                    for(const file of commandFiles) {
                                        const NOMBRE_COMANDO_ERRONEO = file.split('\\').pop().split('/').pop().split(".")[0];
                                        try {
                                            const command = await require(`../../${folder}/${subFolders}/${file}`);
                                            if (command.CMD.name) {
                                                Client.slashCommands.set(command.CMD.name, command);
                                                console.log(`(+) SlashCommand: ${command.CMD.name}`.blue + ` [ ` + `OK`.green + ` ]`);
                                                Client.slashArray.push(command.CMD); 
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
                            console.log(`(+) ${Client.slashCommands.size} SlashCommands cargados`.green);



                            console.log(`(/) Cargando eventos`.yellow);

                    Client.removeAllListeners();
                    let eventArray = [];

                    const dirPath = path.resolve(__dirname, '../../../events');
                    //const dirPath = path.resolve(__dirname, '/home/container/netcat/src/events');
                    const Files = readdirSync(dirPath)
                    .filter((file) => file.endsWith('js'))
                    .map(async(file) => {
                        const NOMBRE_EVENTO = file.split('\\').pop().split('/').pop().split(".")[0];
                        try {
                            const event = require(`../../../events/${file}`);

                            if (event.once) {
                                Client.once(event.name, (...args) => event.execute(Client, ...args));
                                console.log(`(+) Evento: ${NOMBRE_EVENTO}`.blue + ` [ ` + `OK`.green + ` ]`);
                            } else {
                                Client.on(event.name, (...args) => event.execute(Client, ...args));
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


    Client.files = new LoadFiles(Client);
    console.log(`(/) Cargando AntiCrash-System`.yellow);

        const RUTA_ARCHIVOS = await Client.files.loadFiles(`/container/${botfolder}/src/core/AntiCrash-System`);

        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                try {
                    require(rutaArchivo)(Client);
                } catch (e) {
                    console.log(`(-) AntiCrash-System `.blue + `[ ` + `ERROR`.red + ` ]`);
                    //console.log(e);
                }
            })
}

console.log(`(+) AntiCrash-System `.blue + `[ ` + `OK`.green + ` ]`);   

                }
                    break;
            }

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .addFields([
                            { name: `<a:netcatemojicorrecto:1080080705117229057> ${opcion} Recargados`, value: `> *Okay!*` }
                        ])
                        .setColor("Green")
                ]
            });
        } catch (e) {
            interaction.reply(`**Ha ocurrido un error a al recargar el bot!**\n*Mira la consola para más detalles.*`);
            console.log(e);
            return;
        }
    }
}


