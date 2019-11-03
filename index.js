const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
var myLife = 0;
var userMsg;
var spaceIndex;
var num;


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.member.hasPermission('ADMINISTRATOR')){
		if(message.content.startsWith(`${prefix}oml`)){
			myLife++;
			message.channel.send("There are now " + myLife + " things on my life.")
		}
		else if(message.content.startsWith(`${prefix}setoml`)){
			userMsg = message.content;
			spaceIndex = userMsg.indexOf(" ") + 1;
			num = userMsg.substring(spaceIndex);
			if (!(isNaN(num))) {
				myLife = num;
				message.channel.send("There are now " + myLife + " things on my life.")
			}
			else {
				message.channel.send("Not a valid number!");
			}
		}
	}
})

client.login(token);
