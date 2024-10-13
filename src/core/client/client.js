const { Client } = require('discord.js');
const { NetCatArraysLoader, NetCatIntents, NetCatIntentsArray, NetCatMentionsAll } = require('netcat-utils');
const token = require('../../data/token/token');

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
        })
    }

    load() {

    }

    async start() {
        console.log("Encendiendo el bot...");
        this.load();
        this.login(token);
    }

    shutdown() {
        console.log("Apagando Bot...");
        this.destroy();
    }
}

module.exports = Bot;