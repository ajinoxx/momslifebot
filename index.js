const Discord = require('discord.js');
const client = new Discord.Client();
const modRole = '627267659364302848';
const defaultAvatar = "https://miro.medium.com/max/1200/1*pHb0M9z_UMhO22HlaOl2zw.jpeg";
const brooklynAvatar = "https://cdn.discordapp.com/avatars/631311221148352569/09477abfb49a707c02ae6c0f1618b836.png";
var irvinTime = null;
var timePassed;
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

function wait(ms)
{
var d = new Date(); //get time of calling
var d2 = null;
do {
	d2 = new Date(); //get current time
}
while(d2-d < ms); //while the difference between the current time and the intial time is less than the input
}

function cloneBrooklyn(){
	message.react('😍');
	//message.channel.send({files : ["https://i.imgur.com/eu011Sl.png"]}) //sends pic of brooklyn replying
	
	message.guild.members.get('640607782571081741').setNickname("brooklynratel")
	.then(() => //waits til nickname is changed
	client.user.setAvatar(brooklynAvatar))
	.then(() => //waits til avatar is changed
	message.channel.send("😍 Irvin"))
	.then(() => //waits til the message is successfully sent
	message.guild.members.get('640607782571081741').setNickname("Irvin's Mom"))
	.then(() => //waits til nickname is changed again
	setTimeout(function(){ 
		client.user.setAvatar(defaultAvatar)
	 }, 10000)) //waits for 10 seconds to change the avatar back to the default
	.catch(error => { //if anything goes bad, send message and log it in the console
		message.channel.send("Someting went wong!")
		console.log(error)
	});
	irvinTime = new Date(); //get time of when the process is successfully completed
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
			else if(message.content.startsWith(`%joke`)){
				randomNum = Math.random();
				randomNum *= 83;
				randomNum = Math.ceil(randomNum);
				message.channel.send(jokes[randomNum]);
			}
			else if(message.content.startsWith(`%irvintime`)){
				if (irvinTime + 600000 < message.createdTimestamp)
					timePassed = true;
				else
					timePassed = false;
				message.channel.send("irvinTime value (createdTimestamp): " + irvinTime);
				message.channel.send("has 10 mins passed (createdTimestamp): " + timePassed);
				message.channel.send("createdTimestamp difference: " + (irvinTime - message.createdTimestamp))
				message.channel.send("createdAt difference: " + (irvinTime - message.createdAt))
				if (irvinTime + 600000 < message.createdAt)
					timePassed = true;
				else
					timePassed = false;
				message.channel.send("has 10 mins passed (createdAt): " + timePassed)
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

	if (hasIrvin != -1 && message.author.id != '640607782571081741' || message.author.id == '398613568213483521'){ //checks if message has irvin and the bot is not the author, or if irvin is the author
		message.react('😍');
	}

	if (hasIrvin != -1 && message.author.id != '640607782571081741' && irvinTime == null){//checks to see if irvin is in message, author isnt bot, and if this is the first time occuring
		//message.channel.send({files : ["https://i.imgur.com/eu011Sl.png"]}) //sends pic of brooklyn replying
		message.guild.members.get('640607782571081741').setNickname("brooklynratel")
		.then(() => //waits til nickname is changed
			client.user.setAvatar(brooklynAvatar))
		.then(() => //waits til avatar is changed
			message.channel.send("😍 Irvin"))
		.then(() => //waits til the message is successfully sent
			message.guild.members.get('640607782571081741').setNickname("Irvin's Mom"))
		.then(() => //waits til nickname is changed again	
			client.user.setAvatar(defaultAvatar))
		.catch(error => { //if anything goes bad, send message and log it in the console, then set the nickname back
			message.guild.members.get('640607782571081741').setNickname("Irvin's Mom")
			.then(() =>//waits til nickname is switched back to send error
				message.channel.send("Sumting wong!")) 
			console.log(error)
		});
		irvinTime = message.createdTimestamp; //get time of when the process is successfully completed
	}
	else if(hasIrvin != -1 && message.author.id != '640607782571081741' && message.createdAt > irvinTime + 600000){ //checks to see if irvin is in message, author isnt bot, and that 10 mins have passed
		//message.channel.send({files : ["https://i.imgur.com/eu011Sl.png"]}) //sends pic of brooklyn replying
		message.guild.members.get('640607782571081741').setNickname("brooklynratel")
		.then(() => //waits til nickname is changed
			client.user.setAvatar(brooklynAvatar))
		.then(() => //waits til avatar is changed
			message.channel.send("😍 Irvin"))
		.then(() => //waits til the message is successfully sent
			message.guild.members.get('640607782571081741').setNickname("Irvin's Mom"))
		.then(() => //waits til nickname is changed again
			client.user.setAvatar(defaultAvatar))
		.catch(error => { //if anything goes bad, send message and log it in the console, then set the nickname back
			message.guild.members.get('640607782571081741').setNickname("Irvin's Mom")
			.then(() =>//waits til nickname is switched back to send error
				message.channel.send("Sumting wong!"))
			console.log(error)
		});
		irvinTime = message.createdTimestamp; //get time of when the process is successfully completed
	}

	if(userMsg.indexOf("nigger") != -1 || userMsg.indexOf("nigga") != -1 || userMsg.indexOf("nigbag") != -1 || userMsg.indexOf("nword") != -1 || userMsg.indexOf("n-word") != -1 || userMsg.indexOf("n word") != -1 || userMsg.indexOf("czarnuch") != -1){
		message.react('👎🏿')
	}
})

client.login(process.env.token);
