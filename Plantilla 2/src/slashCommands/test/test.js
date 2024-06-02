const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setName('test-anticrash-system')
    .setDescription('Comando para probar el anticrash-system'),

    async execute(Client, interaction) {
        interaction.reply(`${Client.user}`);
    }
}