const Commando = require('discord.js-commando');
const path = require('path');
const DBL = require("dblapi.js");
const moment = require("moment");
const music = require('discord.js-music-v11');
const emojis = require('emoji-regex');
const fs = require('fs');


const client = new Commando.Client({
  owner: '335035386923581440', 
  commandPrefix: 't!', 
  disableEveryone: true,
  unknownCommandResponse: false
});
const dbl = new DBL(process.env.DBL_TOKEN, client);
dbl.on('posted', () => {
  console.log('Server count posted!');
})
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})



client.registry
.registerDefaultTypes()
.registerGroups([
  ['general', 'General'],
  ['group2', 'Fun'],
  ['music', 'Music'],
  ['game', 'Game'], 
  ['group3', 'Random'], 
  ['fun1', 'Emotes'], 
  ['group4', 'Utility'],
  ['group5', 'Moderation'], 
  ['group6', 'NSFW'], 
  ['commands', 'Bot Owner Only'], 
  ['test', 'Not released'], 
]) 
 .registerDefaultCommands({
    help: false,
    ping: false, 
    prefix: false, 
    eval_: false 
  })

.registerCommandsIn(path.join(__dirname, 'commands'));

process.on('unhandleRejection', e => this.client.channels.get('472733185323696128').send(e))
.on('uncaughtException', e => this.client.channels.get('472733185323696128').send(e));

client.on('disconnect', event => {
	console.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
	process.exit(0);
});

client.on('commandRun', command => console.log(`{COMMAND} Ran command ${command.groupID}:${command.memberName}.`));

client.on('error', err => console.error('[ERROR]', err));

client.on('warn', err => console.warn('[WARNING]', err));

client.on('commandError', (command, err) => console.log('[COMMAND ERROR]', command.name, err));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
      function randomStatus() {
        let status = [`${moment().utcOffset('+0700').format("HH:mm")} WIB`, `${moment().utcOffset('+0900').format("HH:mm")} WIT`, `${moment().utcOffset('+0800').format("HH:mm")} WITA`]
          let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], {type: 'PLAYING'});
	}; setInterval(randomStatus, 25000)
});

client.login(process.env.TOKEN);
