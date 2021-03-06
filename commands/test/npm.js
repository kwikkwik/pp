const Command = require('../../structures/Command');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { trimArray } = require('../../util/Util');

module.exports = class NPMCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'npm',
			aliases: ['npm-package'],
			group: 'test',
			memberName: 'npm',
			description: 'Responds with information on an NPM package.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'pkg',
					label: 'package',
					prompt: 'What package would you like to get information on?',
					type: 'string',
					parse: pkg => encodeURIComponent(pkg.replace(/ /g, '-'))
				}
			]
		});
	}

	async run(msg, { pkg }) {
		try {
			const { body } = await request.get(`https://registry.npmjs.com/${pkg}`);
			if (body.time.unpublished) return msg.say('This package no longer exists.');
			const version = body.versions[body['dist-tags'].latest];
			const maintainers = trimArray(body.maintainers.map(user => user.name));
			const dependencies = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;
			const embed = new RichEmbed()
				.setColor(0xCB0000)
				.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
				.setTitle(body.name)
				.setURL(`https://www.npmjs.com/package/${pkg}`)
				.setDescription(body.description || 'No description.')
				.addField('❯ Version', body['dist-tags'].latest, true)
				.addField('❯ License', body.license || 'None', true)
				.addField('❯ Author', body.author ? body.author.name : '???', true)
				.addField('❯ Creation Date', new Date(body.time.created).toDateString(), true)
				.addField('❯ Modification Date', new Date(body.time.modified).toDateString(), true)
				.addField('❯ Main File', version.main || 'index.js', true)
				.addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
				.addField('❯ Maintainers', maintainers.join(', '));
			return msg.embed(embed);
		} catch (err) {
			if (err.statusCode === 404) return msg.say('Could not find any results.');
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
