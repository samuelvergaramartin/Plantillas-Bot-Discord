const { EmbedBuilder } = require('discord.js');
const { create } = require('sourcebin');
const { ownerid } = require('../../../data/socket/socket.json');
const { raiz } = require('../../../data/builders/app.commands.builder.json');

module.exports = {
    CMD: {
        type: raiz.appcommandBase.type.slash,
        name: "eval",
        description: "Comando exclusivo del dueño del bot",
        options: [
            {
                type: raiz.appcommandBase.options.type.string,
                name: "codigo",
                description: "Escribe un código a evaluar",
                required: true
            }
        ]
    },

    async execute(botname, interaction) {
                function ejecutarcomandoisOK() {
                    
                    
                    //Eval
                    async function enviar(mensaje) {
                        return await interaction.reply(mensaje);
                    };
                
                    async function exec(codigo) {
                        return await require('child_process').execSync(codigo);
                    };
                
                    function mayuscula(string) {
                        string = string.replace(/[^a-z]/gi, '');
                        return string[0].toUpperCase() + string.slice(1);
                    };
                
                    let tiempo1 = Date.now();
                
                    const edit = new EmbedBuilder()
                        .setDescription(':stopwatch: Evaluando...')
                        .setColor('Red');
                    interaction.reply({ embeds: [edit] }).then(async codigo => {
                        try {
                            let code = interaction.options.getString('codigo');
                            let evalued = await eval(code);
                            let tipo = typeof evalued || 'Tipo no encontrado.';
                            if(typeof evalued !== 'string')
                                evalued = require('util').inspect(evalued, {
                                    depth: 0,
                                    maxStringLength: 2000
                                });
                            let txt = '' + evalued;
                
                            if(txt.length >= 1024) {
                                create([
                                    {
                                        content: `- - - Eval - - -\n\n${txt.replace(botname.token, 'Wow, un token').replace(/(bot)/g, 'bot')}`,
                                        language: 'javascript'
                                    },
                                ],
                                {
                                    title: 'Eval',
                                    description: 'El eval es muy largo'
                                }).then(() => {
                                    const embed = new EmbedBuilder()
                                    .addFields([
                                        {  name: ':inbox_tray: Entrada', value: `\`\`\`js\n${code.slice(0, 748)}\n\`\`\`` },
                                        {  name: ':outbox_tray: Salida', value: `\`El codigo es muy largo, link:\` ${owo.url}` },
                                        {  name: ':file_folder: Tipo', value: `\`\`\`js\n${mayuscula(tipo)}\n\`\`\`` },
                                        {  name: ':stopwatch: Tiempo', value: `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\`` },
                                    ])
                                    .setColor('Red');
                                    
                interaction.editReply({ embeds: [embed] });
                                });
                            } else {
                                const embed = new EmbedBuilder()
                                .addFields([
                                    {  name: ':inbox_tray: Entrada', value: `\`\`\`js\n${code.slice(0, 748)}\n\`\`\`` },
                                    {  name: ':outbox_tray: Salida', value: `\`\`\`js\n${txt.replace(botname.token, '🔴|No tengo la autorización para revelar eso.').replace(/(bot)/g, 'bot')}\n\`\`\`` },
                                    {  name: ':file_folder: Tipo', value: `\`\`\`js\n${mayuscula(tipo)}\n\`\`\`` },
                                    {  name: ':stopwatch: Tiempo', value: `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\`` },
                                ])
                                .setColor('Red');
                interaction.editReply({ embeds: [embed] });
                            }
                        } catch (err) {
                            let code = interaction.options.getString('codigo');
                            const embed = new EmbedBuilder()
                                .setAuthor({name:`Error en el eval`,iconURL: botname.user.displayAvatarURL({ dynamic: true })})
                                .addFields([
                                    {  name: ':inbox_tray: Entrada', value: `\`\`\`js\n${code.slice(0, 748)}\n\`\`\`` },
                                    {  name: ':outbox_tray: Salida', value: `\`\`\`js\n${err}\n\`\`\`` },
                                    {  name: ':file_folder: Tipo', value: `\`\`\`js\nError\n\`\`\`` },
                                ])
                                .setColor('Red');
                interaction.editReply({ embeds: [embed] });
                        };
                    });
            
        }
        if(interaction.user.id !== ownerid) {
            interaction.reply({ content:"**:x: | PERMISO DENEGADO:** Solo el creador del bot puede usar esto!", ephemeral: true});

        }

        if(interaction.user.id == ownerid) {
            ejecutarcomandoisOK();
            return;
        }
    }
}