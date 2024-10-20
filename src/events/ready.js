const { green, blue, magenta } = require('colors');
const AsciiTable = require('ascii-table');

module.exports = {
    name: "ready",
    once: false,
    activated: true,
    run: async(bot) => {
        const tableStatus = new AsciiTable(green("          All Systems Loaded!            "))
        tableStatus.addRow(magenta('Bot'), blue(bot.user.username));
        tableStatus.addRow(magenta('Status'), green("ONLINE"));

        console.log(tableStatus.toString());
    }
}