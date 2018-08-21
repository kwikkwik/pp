const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class botinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
	    aliases: ["info", "bi"],
            group: 'group4',
            memberName: 'botinfo',
	    description: 'Shows info about the Bot'
        });
    }
    async run(msg) {
        const os = require('os');
        const arch = os.arch()
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
    
        let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);

        const embed = new RichEmbed()

        embed.setThumbnail(this.client.user.avatarURL)
        embed.setTitle(`Info of ${this.client.user.username}`)
        embed.setColor('#ffc700')
        embed.addField('Creator', '<@!335035386923581440> | **Brickmaster#2000**')
	embed.addField("Created At", `${this.client.user.createdAt}`)
        embed.addField('Node', `${process.version}`)
        embed.addField('Library', 'discord.js')
        embed.addField('Operating System', `${os.platform} ${arch}`)
	embed.addField('Usefull link:', '[Invite me](https://discordapp.com/oauth2/authorize?client_id=481404594308775956&scope=bot&permissions=2146958591)') 
        embed.setFooter(`Requested by: ${msg.author.tag}`)
	    code: 'AsciiDoc'
        return msg.embed(embed);
    }

};
