const { glob } = require('glob');

module.exports = class BotUtils {
    constructor(Client) {
        this.Client = Client;
    }


    async loadFiles(dirName) {
        const Files = await glob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.{js,json}`);
        Files.forEach((file) => delete require.cache[require.resolve(file)]);
        return Files;
    }
}
