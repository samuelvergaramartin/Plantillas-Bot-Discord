module.exports = {
  name: "interactionCreate",
  once: false,

  execute: async(botname, interaction) => {

   
    const slashcmds = botname.commands.get(interaction.commandName)
    if(!interaction.channel) return interaction.reply({ content: "**:x: | ERROR CRÍTCO INTERNO:** \n**ANTI-CRASH-SYSTEM:** ON 🟢.\n**Error identificado:**```js\n if(!interaction.channel.permissionsFor(botname.user).has('ViewChannel')) return interaction.reply({ content: '**:x: | ERROR:** No tengo permisos suficientes. Permisos que me faltan: `ViewChannel`', ephemeral: true}).catch(()=> { null; });```\n```bat\nnode:events:491\n      throw er; // Unhandled 'error' event\n      ^\nTypeError: Cannot read properties of null (reading 'permissionsFor')\n    at Object.execute (/home/container/src/events/interactionCreate.js:15:29)```", ephemeral: true}).catch(()=> { null; });
    if(interaction.channel.type === 11) return interaction.reply({ content:"**:x: | ERROR:** No puedo operar en publicaciones de foros. \nPor favor, inténtalo en otro tipo de canal.", ephemeral: true}).catch(()=> { null; });
    if(!interaction.channel.permissionsFor(botname.user).has("ViewChannel")) return interaction.reply({ content: "**:x: | ERROR:** No tengo permisos suficientes. Permisos que me faltan: `ViewChannel`", ephemeral: true}).catch(()=> { null; });
    if(!interaction.channel.permissionsFor(botname.user).has("SendMessages")) return interaction.reply({ content: "**:x: | ERROR:** No tengo permisos suficientes. Permisos que me faltan: `SendMessages`", ephemeral: true}).catch(()=> { null; });
    
  if (!interaction.isCommand()) return;
  if(interaction.guild.members.me.isCommunicationDisabled()) return;

    if(!slashcmds) return;
    
    try {
        slashcmds.execute(botname, interaction) 
    } catch(e) {
        console.error(e);
    }
  }
}

