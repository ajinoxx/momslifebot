const Discord = require('discord.js');
const client = new Discord.Client();
const modRole = '627267659364302848';
var myLife = 0;
var userMsg;
var spaceIndex;
var num;
var hasModRole;
var userMsg;
var hasIrvin;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	userMsg = message.content.toLowerCase();
	if (message.content.startsWith(`%`)) {
		hasModRole = message.member.roles.has(modRole);
		if (hasModRole){
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
		else{
		message.channel.send("You are too stupid for this command!")
		}
	}

	if(userMsg.startsWith(`im`) || userMsg.startsWith(`i'm`)){
		message.channel.send("Hey " + userMsg.substring(userMsg.indexOf(" ") + 1) + ", I'm Irvin's mom.");
	}

	hasIrvin = userMsg.indexOf("irvin")

	if(!(hasIrvin == -1) && !(message.author('640607782571081741'))){
		message.guild.members.get('640607782571081741').setNickname("brooklynratel");
		message.react('🍆')
		message.guild.members.get('640607782571081741').setNickname("Irvin's Mom");
	}
})

client.login(process.env.token);
