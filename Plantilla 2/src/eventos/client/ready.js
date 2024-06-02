module.exports = async Client => {
    console.log(`Conectado como ${Client.user.tag}`.green);
    if(Client?.application?.commands) {
        Client.application.commands.set(Client.slashArray);
        console.log(`(/) ${Client.slashCommands.size} Comandos Publicados!`.green);
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarrollado por dewstouh#1088 || - ||   ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/