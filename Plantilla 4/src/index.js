const { NetCatIntents, NetCatMentionsAll } = require('netcat-utils');
const Bot = require('./core/client/Bot');
const token = require('./data/token/token');

let data = Bot.dataSchema;

data.botName = "Test-Bot";
data.botIntents.push(NetCatIntents.GUILDS);
data.botToken = token;
data.botMentions = NetCatMentionsAll;
data.botStatus = "idle";
data.botPresenceMesaage = "En fase de pruebas";

const testBot = new Bot(data);
testBot.prepareClient();
testBot.start();