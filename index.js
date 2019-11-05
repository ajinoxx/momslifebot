const Discord = require('discord.js');
const client = new Discord.Client();
const modRole = '627267659364302848';
const defaultAvatar = "https://miro.medium.com/max/1200/1*pHb0M9z_UMhO22HlaOl2zw.jpeg";
var irvinID;
var myLife = 0;
var userMsg;
var spaceIndex;
var num;
var hasModRole;
var userMsg;
var hasIrvin;
var hasNWord;

function changeName() {
	message.guild.members.get('640607782571081741').setNickname("Irvin's Mom")
}

function changeAvatar() {
	client.user.setAvatar(defaultAvatar)
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	userMsg = message.content.toLowerCase();

	if (message.content.startsWith(`%`)) {		
		irvinID = message.guild.members.get("398613568213483521");
		hasModRole = message.member.roles.has(modRole);
		if (hasModRole){
			if(message.content.startsWith(`%oml`)){
				myLife++;
				message.channel.send("There are now " + myLife + " things on my life.");
			}
			else if(message.content.startsWith(`%setoml`)){
				userMsg = message.content;
				spaceIndex = userMsg.indexOf(" ") + 1;
				num = userMsg.substring(spaceIndex);
				if (!(isNaN(num))) {
					myLife = num;
					message.channel.send("There are now " + myLife + " things on my life.");
				}
				else {
					message.channel.send("Not a valid number!");
				}
			}
			else if(message.content.startsWith(`%count`)){
				message.channel.send("There are " + myLife + " things on my life right now.");
			}
			else if(message.content.startsWith(`%mute`)){
				irvinID.addRole('549064305807589387');
				irvinID.removeRole('543187460021288960')
				message.channel.send("Irvin is now muted.");
			}
			else if(message.content.startsWith(`%unmute`)){
				irvinID.addRole('543187460021288960');
				irvinID.removeRole('549064305807589387')
				message.channel.send("Irvin is now unmuted.");
			}
		}
		else{
		message.channel.send("You are too stupid for this command!");
		}
	}

	if(userMsg.startsWith(`im`) || userMsg.startsWith(`i'm`)){
		message.channel.send("Nǐ hǎo " + userMsg.substring(userMsg.indexOf(" ") + 1) + ", I'm Irvin's mom.");
	}

	hasIrvin = userMsg.indexOf("irvin");

	if(!(hasIrvin == -1) && !(message.author.id == '640607782571081741')){
		//message.guild.members.get('640607782571081741').setNickname("brooklynratel");                                          //iffy
		//client.user.setAvatar("https://cdn.discordapp.com/avatars/631311221148352569/09477abfb49a707c02ae6c0f1618b836.png");  //iffy
		//message.channel.send("😍 Irvin");                                                                                    //iffy
		//setTimeout(changeName, 1000);                                                                                        //iffy
		//setTimeout(changeAvatar, 1000);                                                                                     //iffy
		message.react('😍');
	}
	else if( message.author.id == '398613568213483521'){
		message.react('😍');
	}

	hasNWord = userMsg.indexOf("nig")

	if(!(hasNWord == -1)){
		message.react('👎🏿')
	}
})

client.login(process.env.token);
