module.exports = {
    name: "interactionCreate",
    once: false,
    execute: async(botname, interaction) => {
        if(interaction.channel.type !== 1) {
            if(!interaction.channel.permissionsFor(botname.user).has("ViewChannel")) return interaction.reply({  content: "**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `ViewChannel`", ephemeral: true });
          if(!interaction.channel.permissionsFor(botname.user).has("SendMessages")) return interaction.reply({  content: "**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessages`", ephemeral: true });
                  if(!interaction.channel.permissionsFor(botname.user).has("SendMessagesInThreads")) {
                      if(interaction.channel.type === 11) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true});
                      if(interaction.channel.type === 12) return interaction.reply({ content:"**:x: | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true});
                  }
          }

          const COMANDO = botname.slashCommands.get(interaction.commandName);

          if (!COMANDO) return;

          try {
            // Si la interacción se está produciendo en un canal de mensaje directo, utiliza el método interaction.user.send()
            if (interaction.channel.type === 'DM') {
              COMANDO.execute(botname, interaction);
            } else {
              COMANDO.execute(botname, interaction);
            }
          } catch (e) {
            console.error(e);
          }
    }
}