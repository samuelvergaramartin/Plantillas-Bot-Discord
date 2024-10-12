const { Client } = require('discord.js');
const { NetCatArraysLoader, NetCatIntents, NetCatIntentsArray, NetCatMentionsAll } = require('netcat-utils');

//Ahora, en este punto , cargaremos los Intents correspondientes en el array de intents antes de pasarselo al super constructor
NetCatArraysLoader.loadIntents(NetCatIntents.GUILDS)

class Bot extends Client {
    constructor() {
        super({
            intents: NetCatIntentsArray,
            allowedMentions: {
                parse: NetCatMentionsAll,
                repliedUser: true,
            },
        });

        
    }
}