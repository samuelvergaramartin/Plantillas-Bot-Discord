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
        if(data.botIntents) this.botIntents = data.botIntents;
        if(data.botPartials) this.botPartials = data.botPartials;
        if(data.botMentions) this.botMentions = data.botMentions;

        super({
            intents: this.botIntents,
            partials: this.botPartials,
            allowedMentions: {
                parse: this.botMentions,
                repliedUser: true
            }
        });

        if(data.botName) this.botName = data.botName;
        else this.botName = this.user.username;

        if(!data.botToken) throw new Error("ERROR: The bot token was not provided");
        else this.botToken = data.botToken;

        if(data.botCommands) this.botCommands = data.botCommands;

        if(data.botEvents) this.botEvents = data.botEvents;ç

        if(data.botStatus == null) this.botStatus = "online";
        else this.botStatus = data.botStatus;

        if(data.botPresenceMesaage == null) this.botPresenceMesaage = `${this.botName} : Ready`;
        else this.botPresenceMesaage = data.botPresenceMesaage;
    }

    prepareClient() {
        this.user.setStatus(this.botStatus);
        this.user.setActivity({type: Custom, state: this.botPresenceMesaage });
    }
}

module.exports = Bot;