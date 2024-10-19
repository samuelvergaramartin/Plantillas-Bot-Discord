const AntiCrashSystem = require('../AntiCrash/AntiCrash-System');
const { red, yellow, green, blue } = require('colors');
function AntiCrashSystemLoader (showErrors) {
    
    console.log(yellow("(/) Cargando AntiCrash-System"));

    try {
        AntiCrashSystem();
        console.log(blue("(+) AntiCrash-System ") + "[ " + green("OK") +  " ]");
    } catch (error) {
        console.log(blue("(-) AntiCrash-System ") + "[ " + red("ERROR") +  " ]");
        if(showErrors) console.log(error);
    }
}

module.exports = AntiCrashSystemLoader;