const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { create } = require('sourcebin');
const { ownerid } = require('../../../data/socket.json');
//const { ownerid } = require('/home/container/botname/src/data/socket.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Comando exclusivo del dueño del bot')
    .addStringOption(Option1 =>
        Option1.setName('codigo')
        .setDescription('Escribe un código a evaluar')
        .setRequired(true)),

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
				.setColor('0x7289DA');
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
							.setColor('0x7289DA');
							
		interaction.editReply({ embeds: [embed] });
						});
					} else {
						const embed = new EmbedBuilder()
                        .addFields([
                            {  name: ':inbox_tray: Entrada', value: `\`\`\`js\n${code.slice(0, 748)}\n\`\`\`` },
                            {  name: ':outbox_tray: Salida', value: `\`\`\`js\n${txt.replace(botname.token, '🔴|No tengo la autoricacion para revelar eso.').replace(/(bot)/g, 'bot')}\n\`\`\`` },
                            {  name: ':file_folder: Tipo', value: `\`\`\`js\n${mayuscula(tipo)}\n\`\`\`` },
                            {  name: ':stopwatch: Tiempo', value: `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\`` },
                        ])
						.setColor('0x7289DA');
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
						.setColor('0xFE2D00');
		interaction.editReply({ embeds: [embed] });
				};
			});
    
}
if(interaction.user.id !== ownerid) {
    interaction.reply({ content:"**:x: | PERMISO DENEGADO:** Solo el creador del bot puede usar esto!", ephemeral: true}).catch(()=> { null; });
}
if(interaction.user.id === ownerid) {
	if(!interaction.guild.members.me.permissions.has('Administrator')) return interaction.reply({ content:"**:x: | ERROR:** No tengo permisos suficientes. \nPermisos que me faltan: `Administrator`", ephemeral: true}).catch(()=>{ null;});
    ejecutarcomandoisOK();
}
        }
}