async function boot(){
    const botname = require('../client/Client');
    //const botname = require('/home/container/botname/src/core/client/client');
    new botname().start();
}

module.exports = boot;