function AntiCrashSystem() {
    //Aqui iremos capturando las excepciones del hilo principal para evitar que el programa se detenga por excepciones

    process.on('uncaughtException', (exception, origin) => {
        console.log("AntiCrash System: Exception detected! uncaughtException captured!");
        console.log(exception, origin);
    });

    process.on('uncaughtExceptionMonitor', (exception, origin) => {
        console.log("AntiCrash System: Exception detected! uncaughtExceptionMonitor captured!");
        console.log(exception, origin);
    });

    //Ahora haremos lo mismo pero con las promesas rechazadas

    process.on('unhandledRejection', (rejection, promise) => {
        console.log("AntiCrash System: Rejection detected! unhandledRejection captured!");
        console.log(rejection, promise);
    });
}

module.exports = AntiCrashSystem;