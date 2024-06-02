const color = require('colors');
const { ActivityType } = require('discord.js');
module.exports = {
    name: "ready",
    once: false,
    execute: async(botname) => {
        console.log(`Conectado como ${botname.user.tag}`.america);
        if(botname?.application?.commands) {
            botname.application.commands.set(botname.slashArray);
           // console.log(`(/) ${botname.slashCommands.size} Comandos Slash Publicados!`.green);
        }
        var estado = "dnd";
    
        var activitynormal = `en ${botname.guilds.cache.size} servidores`;
        var activitymaintenance = "EN MANTENIMIENTO";
        var activitydeveloping = "a Sam170703dev"
    
        if(estado === "online") {
            var actividad = activitynormal;
            var type = ActivityType.Listening;
            var modo = "En servicio";
        }
        if(estado === "idle") {
            var actividad = activitymaintenance;
            var type = ActivityType.Playing;
            var modo = "EN MANTENIMIENTO";
        }
        if(estado === "dnd") {
            var actividad = activitydeveloping;
            var type = ActivityType.Listening;
            var modo = "En desarrollo";
        }
    
        botname.user.setActivity({name: `${actividad}`, type: type});
        botname.user.setStatus(`${estado}`);
        console.log(`Bot encendido`.green)
        if(`${estado}` == "online") {
            console.log(`Bot: ${botname.user.username}`.cyan + `\nEstado: ${estado}`.green);
            console.log(`Modo: ${modo}`.green);
        }
        if(`${estado}` == "idle") {
            console.log(`Bot: ${botname.user.username}`.cyan + `\nEstado: ${estado}`.yellow);
            console.log(`Modo: ${modo}`.yellow);
        }
        if(`${estado}` == "dnd") {
            console.log(`Bot: ${botname.user.username}`.cyan + `\nEstado: ${estado}`.red);
            console.log(`Modo: ${modo}`.yellow);
        }
        function repetir() {
            //var estadobot = "online";
            botname.user.setActivity({name: `${actividad}`, type: type});
            botname.user.setStatus(`${estado}`);
        }
        setInterval(()=> repetir(), 50000);
    }
}