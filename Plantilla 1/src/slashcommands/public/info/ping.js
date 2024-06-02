const { SlashCommandBuilder,
    EmbedBuilder } = require('discord.js');
    
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping del bot'),
    
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
            .setColor('0xff00d9')]}).then(() => {
            
            let tiempoTotal = time - Date.now()
            var resultado = Math.abs(tiempoTotal);
            
            interaction.editReply({ embeds: 
                [new EmbedBuilder()
                    .setTitle("Pong! 🏓")
                    .setDescription("`Discord API:` " +botname.ws.ping+ " ms\n`Tiempo de respuesta del bot:` " +resultado+ " ms")
                    .setColor('0xff00d9')]}).catch(()=> null);
        })
    },
    };
     