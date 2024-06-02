module.exports = async (Client, interaction) => {
    if (!interaction.guild || !interaction.channel) return;
    //const GUILD_DATA = await client.db.getGuildData(interaction.guild.id);
    if(!interaction.channel) return;
    if(!interaction.channel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes.\nPermisos que me faltan: `ViewChannel`", ephemeral: true}).catch(()=> { null; });
    if(!interaction.channel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes.\nPermisos que me faltan: `SendMessages`", ephemerañ: true}).catch(()=> { null; });
    if(!interaction.channel.permissionsFor(interaction.guild.members.me).has("SendMessagesInThreads")) {
        if(interaction.channel.type === 11) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true}).catch(()=> { null; });
        if(interaction.channel.type === 12) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true}).catch(()=> { null; });
    }
    const COMANDO = Client.slashCommands.get(interaction?.commandName);
    
    if(COMANDO){
        if(COMANDO.OWNER) {
            if (!process.env.OWNER_IDS.split(" ").includes(interaction.author.id)) return interaction.reply({content: `❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${process.env.OWNER_IDS.split(" ").map(OWNER_ID => `<@${OWNER_ID}>`)}`, ephemeral: true})
        }

        if(COMANDO.BOT_PERMISSIONS){
            if(!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({content: `❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephemeral: true})
        }

        if(COMANDO.PERMISSIONS){
            if(!interaction.member.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({content: `❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephemeral: true})
        }

        //ejecutar el comando
        //COMANDO.execute(client, interaction, "/", GUILD_DATA);
        COMANDO.execute(Client, interaction, "/");
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/