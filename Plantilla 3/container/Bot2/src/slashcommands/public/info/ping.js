const { EmbedBuilder } = require('discord.js');
const { raiz } = require('../../../data/builders/app.commands.builder.json');

module.exports = {
    CMD: {
        type: raiz.appcommandBase.type.slash,
        name: "ping",
        description: "Mira el ping del bot"
    },

    async execute(botname, interaction) {
        if(!interaction.channel.permissionsFor(botname.user).has("EmbedLinks")) return interaction.reply({  content: "**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `EmbedLinks`", ephemeral: true }).catch(()=> { null; });
            if(!interaction.channel.permissionsFor(botname.user).has("SendMessagesInThreads")) {
                if(interaction.channel.type === 11) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true}).catch(()=> { null; });
                if(interaction.channel.type === 12) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true}).catch(()=> { null; });
            }
            const time = Date.now()
        
            interaction.reply({ embeds: 
                [new EmbedBuilder()
                .setTitle("Midiendo latencia...")
                .setDescription("Discord API: Calculando...\nTiempo de respuesta del bot: Calculando...")
                .setColor('Yellow')]}).then(() => {
                
                let tiempoTotal = time - Date.now()
                var resultado = Math.abs(tiempoTotal);
                
                interaction.editReply({ embeds: 
                    [new EmbedBuilder()
                        .setTitle("Pong! 🏓")
                        .setDescription("`Discord API:` " +botname.ws.ping+ " ms\n`Tiempo de respuesta del bot:` " +resultado+ " ms")
                        .setColor('Green')]}).catch(()=> null);
            })
    }
}