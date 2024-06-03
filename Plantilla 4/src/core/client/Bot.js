const { Client, ActivityType: { Custom } } = require('discord.js');

class Bot extends Client {
    botName;
    botToken;
    botCommands = [];
    botEvents = [];
    botStatus = null;
    botPresenceMesaage = null;
    botIntents = [];
    botPartials = [];
    botMentions = [];

    static dataSchema = {
        botName: undefined,
        botToken: undefined,
        botCommands: [],
        botEvents: [],
        botStatus: null,
        botPresenceMesaage: null,
        botIntents: [],
        botPartials: [],
        botMentions: []
    };

    constructor(data) {
        super({
            intents: data.botIntents,
            partials: data.botPartials,
            allowedMentions: {
                parse: data.botMentions,
                repliedUser: true
            }
        });

        if(data.botIntents) this.botIntents = data.botIntents;
        if(data.botPartials) this.botPartials = data.botPartials;
        if(data.botMentions) this.botMentions = data.botMentions;

        if(data.botName) this.botName = data.botName;
        else this.botName = this.user.username;

        if(!data.botToken) throw new Error("ERROR: The bot token was not provided");
        else this.botToken = data.botToken;

        if(data.botCommands) this.botCommands = data.botCommands;

        if(data.botEvents) this.botEvents = data.botEvents;

        if(data.botStatus == null) this.botStatus = "online";
        else this.botStatus = data.botStatus;

        if(data.botPresenceMesaage == null) this.botPresenceMesaage = `${this.botName} : Ready`;
        else this.botPresenceMesaage = data.botPresenceMesaage;
    }

    prepareClient() {
        this.on('ready', ()=> {
            this.user.setStatus(this.botStatus);
            this.user.setActivity({type: Custom, name: this.botPresenceMesaage });
        });
    }

    start() {
        this.login(this.botToken);
        console.log("Sesion iniciada correctamente");
    }
}

module.exports = Bot;