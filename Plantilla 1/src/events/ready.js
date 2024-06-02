const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    once: false,
    execute: async(botname) => {
    
        var estado = "idle";
        botname.user.setActivity({name: `a SamuelVM`, type: ActivityType.Listening});
        botname.user.setStatus(`${estado}`);
        console.log(`Bot: ${botname.user.username}\nEstado: ${estado}`);
        
        
    }
}