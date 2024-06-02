const {Client, GatewayIntentBits} = require('discord.js');
const eventHandler = require('../../handlers/eventHandler');
//const eventHandler = require('/home/container/botname/src/handlers/eventHandler');
const {token} = require('../token/token.json');
//const {token} = require('/home/container/botname/src/core/token/token.json');
const slashcommandsHanlder = require('../../handlers/slashcommands');
//const slashcommandsHanlder = require('/home/container/botname/src/handlers/slashcommands');
class botname extends Client{
    constructor(){
        super({ intents: 
            [GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers]});
        
    };


start(){

    eventHandler(this);
    slashcommandsHanlder(this);
    this.login(token);
};
};

module.exports = botname;
