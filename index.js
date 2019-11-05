const Discord = require('discord.js');
const client = new Discord.Client();
const modRole = '627267659364302848';
const defaultAvatar = "https://miro.medium.com/max/1200/1*pHb0M9z_UMhO22HlaOl2zw.jpeg";
var { jokes } = require('./jokes.json');
var irvinID;
var myLife = 0;
var userMsg;
var spaceIndex;
var num;
var hasModRole;
var userMsg;
var hasIrvin;
var randomNum;

//function changeName() {
//	message.guild.members.get('640607782571081741').setNickname("Irvin's Mom")
//}

//function changeAvatar() {
//	client.user.setAvatar(defaultAvatar)
//}

//function wait(ms)
//{
//var d = new Date();
//var d2 = null;
//do { d2 = new Date(); }
//while(d2-d < ms);
//}

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
			else if(message.content.startsWith(`%joke`)){
				randomNum = Math.random();
				randomNum *= 83;
				randomNum = Math.ceil(randomNum);
				message.channel.send(jokes[randomNum]);
			}
		}
		else{
		message.channel.send("You are too stupid for this command!");
		}
	}

	if(userMsg.startsWith(`can a kangaroo jump higher than a house`)){
		message.channel.send("Of course! Houses can't jump!");
	}
	else if(userMsg.startsWith(`im`) || userMsg.startsWith(`i'm`)){
		message.channel.send("Nǐ hǎo " + userMsg.substring(userMsg.indexOf(" ") + 1) + ", I'm Irvin's mom.");
	}

	hasIrvin = userMsg.indexOf("irvin");

	if(hasIrvin != -1 && message.author.id != '640607782571081741'){
		message.react('😍');
		message.channel.send({files : ["https://i.imgur.com/eu011Sl.png"]})
		
		//message.guild.members.get('640607782571081741').setNickname("brooklynratel");
		//wait(100);                                          
		//client.user.setAvatar("https://cdn.discordapp.com/avatars/631311221148352569/09477abfb49a707c02ae6c0f1618b836.png"); 
		//wait(200); 
		//message.channel.send("😍 Irvin"); 
		//wait(100);
		//message.guild.members.get('640607782571081741').setNickname("Irvin's Mom")
		//wait(10000)
		//client.user.setAvatar(defaultAvatar)
	}
	else if( message.author.id == '398613568213483521'){
		message.react('😍');
	}

	if(userMsg.indexOf("nigger") != -1 || userMsg.indexOf("nigga") != -1 || userMsg.indexOf("nigbag") != -1 || userMsg.indexOf("nword") != -1 || userMsg.indexOf("n-word") != -1 || userMsg.indexOf("n word") != -1 || userMsg.indexOf("czarnuch") != -1){
		message.react('👎🏿')
	}
})

client.login(process.env.token);
