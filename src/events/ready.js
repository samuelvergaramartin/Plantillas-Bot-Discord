const { green, blue } = require('colors');
module.exports = {
    name: "ready",
    once: false,
    activated: true,
    run: async(bot) => {
        console.log(blue("Bot: " + bot.user.username));
        console.log(green("Bot encendido y listo para la acción"));
    }
}