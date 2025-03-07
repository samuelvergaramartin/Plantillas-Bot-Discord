const { InteractionContextType: {Guild, BotDM, PrivateChannel} } = require('discord.js');
module.exports = {
    name: "interactionCreate",
    once: false,
    activated: true,
    run: async(bot, interaction) => {
        if(interaction.context) {
            switch(interaction.context) {
                case Guild: console.log("En servidores");
                break;
                case BotDM: console.log("En DM, pero en el de la app");
                break;
                case PrivateChannel: console.log("User Install");
                break;
            }
        }
    }
}