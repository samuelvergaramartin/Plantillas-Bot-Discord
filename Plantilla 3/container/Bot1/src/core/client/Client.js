const { Client, Collection, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus } = require('discord.js');
const loadEvents = require('../loaders/eventLoader');
const antiCrashLoader = require('../loaders/antiCrashLoader');
const slashcommandLoader = require('../loaders/slashcommandLoader');
const { token } = require('../../data/token/token.json');
module.exports = class extends Client {
    constructor(){
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
                GatewayIntentBits.GuildModeration
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User
            ],
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: true,
            },
        });

        this.slashCommands = new Collection();

    }

    async start() {
        await antiCrashLoader(this);
        await loadEvents(this);
        await slashcommandLoader(this);
        this.login(`${token}`);

    }

}
