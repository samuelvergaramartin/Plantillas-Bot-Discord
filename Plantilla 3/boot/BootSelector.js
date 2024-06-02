const bot1 = require("../container/Bot1/index");
const bot2 = require('../container/Bot2/index');

class GRUB {
    startbots(){  
        setTimeout(function(){
            bot1(this);
        }, 2000);
        setTimeout(function(){
            bot2(this);
        }, 6000);
    }
}

module.exports = GRUB;