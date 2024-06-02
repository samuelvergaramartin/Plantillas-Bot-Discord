async function boot(){
    const botname = require('../client/client');
    //const botname = require('/home/container/botname/src/core/client/client');
    new botname().start();
}

module.exports = boot;