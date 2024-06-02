module.exports = async (Client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;
    const { botprefix } = require('../../core/socket.json');
    let prefix = botprefix;
    if(!message.content.startsWith(prefix)) return;

    const ARGS = message.content.slice(prefix.length).trim().split(/ +/);
    const CMD = ARGS?.shift()?.toLowerCase();

    const COMANDO = Client.commands.get(CMD) || Client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD));

    if (COMANDO) {
        if (COMANDO.OWNER) {
            if (!process.env.OWNER_IDS.split(" ").includes(message.author.id)) return message.reply(`❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${process.env.OWNER_IDS.split(" ").map(OWNER_ID => `<@${OWNER_ID}>`)}`)
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply(`❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`)
        }

        if (COMANDO.PERMISSIONS) {
            if (!message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply(`❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`)
        }

        try {
            //ejecutar el comando
           COMANDO.execute(Client, message, ARGS, prefix);
        } catch (e) {
            message.reply(`**Ha ocurrido un error al ejecutar el comando \`${COMANDO.NAME}\`**\n*Mira la consola para más detalle.*`);
            console.log(e);
            return;
        }

    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/