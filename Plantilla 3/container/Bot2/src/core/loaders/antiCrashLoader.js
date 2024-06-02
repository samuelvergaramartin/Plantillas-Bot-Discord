const LoadFiles = require('./fileLoader');
const color = require('colors');
const { botfolder } = require('../../data/socket/socket.json');
async function antiCrashLoader(botname) {
    botname.files = new LoadFiles(botname);
    console.log(`(/) Cargando AntiCrash-System`.yellow);

        const RUTA_ARCHIVOS = await botname.files.loadFiles(`/container/${botfolder}/src/core/AntiCrash-System`);

        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                try {
                    require(rutaArchivo)(botname);
                } catch (e) {
                    console.log(`(-) AntiCrash-System `.blue + `[ ` + `ERROR`.red + ` ]`);
                    //console.log(e);
                }
            })
        }

        console.log(`(+) AntiCrash-System `.blue + `[ ` + `OK`.green + ` ]`);
}

module.exports = antiCrashLoader;