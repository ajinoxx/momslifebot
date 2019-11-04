const Discord = require('discord.js');
const client = new Discord.Client();
var myLife = 0;
var userMsg;
var spaceIndex;
var num;
var role;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.member.hasPermission('DEAFEN_MEMBERS')){
		rank = message.member.highestRole.name;
		message.channel.send(rank);
		if(message.content.startsWith(`%oml`)){
			myLife++;
			message.channel.send("There are now " + myLife + " things on my life.")
		}
		else if(message.content.startsWith(`%setoml`)){
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
		else if(message.content.startsWith(`%count`)){
			message.channel.send("There are " + myLife + " things on my life right now.")
		}
	}
})

client.login(process.env.token);
