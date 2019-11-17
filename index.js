const Discord = require('discord.js');
const client = new Discord.Client();

const modRole = '627267659364302848';
const intelRole = '543187460021288960';
var hasModRole;

const defaultAvatar = "https://miro.medium.com/max/1200/1*pHb0M9z_UMhO22HlaOl2zw.jpeg";
const brooklynAvatar = "https://cdn.discordapp.com/avatars/631311221148352569/09477abfb49a707c02ae6c0f1618b836.png";

var { jokes } = require('./jokes.json');

var irvinTime = null;
var timePassed;
var irvinID;
var hasIrvin;

var mentionID;

var myLife = 0;

var userMsg;

var spaceIndex;

var setNum;

var randomNum;

//function wait(ms)
//{
//var d = new Date(); //get time of calling
//var d2 = null;
//do {
//	d2 = new Date(); //get current time
//}
//while(d2-d < ms); //while the difference between the current time and the intial time is less than the input
//}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', (member) => {
	member.addRole(intelRole);
	member.guild.channels.get('543185885232103436').send(member + " is now in possession of a big brain.")
});

client.on('guildMemberRemove', (member) => {
	member.guild.channels.get('543185885232103436').send(member + "is no longer an intellectual.")
});

client.on('message', message => {
	
	function cloneBrooklyn(){
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
				setNum = userMsg.substring(spaceIndex);
				if (!(isNaN(setNum))) {
					myLife = setNum;
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
				irvinID.removeRole(intelRole)
				message.channel.send("Irvin is now muted.");
			}
			else if(message.content.startsWith(`%unmute`)){
				irvinID.addRole(intelRole);
				irvinID.removeRole('549064305807589387')
				message.channel.send("Irvin is now unmuted.");
			}
			else if(message.content.startsWith(`%joke`)){
				randomNum = Math.random();
				randomNum *= 82;
				randomNum = Math.ceil(randomNum);
				message.channel.send(jokes[randomNum]);
			}
			else if(message.content.startsWith(`%itime`)){
				if (irvinTime + 600000 < message.createdTimestamp)
					timePassed = true;
				else
					timePassed = false;
				message.channel.send("irvinTime value (createdTimestamp): " + irvinTime + 
					"\nhas 10 mins passed (createdTimestamp): " + timePassed + 
					"\ncreatedTimestamp difference: " + (irvinTime - message.createdTimestamp) +
					"\ncreatedAt difference: " + (irvinTime - message.createdAt));
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
		if(message.content.startsWith(`%massage`)){
			try {
				spaceIndex = message.content.indexOf(" ");
				mentionID = message.content.substring(spaceIndex + 1);
				if (mentionID.startsWith('<@') && mentionID.endsWith('>')){
					mentionID = mentionID.slice(2, -1);
					if (mentionID.startsWith('!')){
						mentionID = mentionID.substring(1);
					}
					mention = message.guild.members.get(mentionID)
					randomNum = Math.random() * 100;
					if (randomNum > 50 ){
						message.channel.send(mention + " has some nasty feet");
						message.channel.send({files :  ["https://tenor.com/view/toenails-fail-feet-pedicure-trendizisst-gif-14641265.gif"]})
					}
					else{
						message.channel.send(mention + " has some tasty toes");
						message.channel.send({files :  ["https://media.giphy.com/media/CzMfYqt8oomnm/giphy.gif"]})
					}
				}
				
			}
			catch(error){
				message.channel.send("Make sure you did %massage @user");
				console.log(error);
			}
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

	if (hasIrvin != -1 && message.author.id != '640607782571081741' && irvinTime == null) //checks to see if irvin is in message, author isnt bot, and if this is the first time occuring
		cloneBrooklyn();
	else if(hasIrvin != -1 && message.author.id != '640607782571081741' && message.createdAt > irvinTime + 600000) //checks to see if irvin is in message, author isnt bot, and that 10 mins have passed
		cloneBrooklyn();
	
	if(userMsg.indexOf("nigger") != -1 || userMsg.indexOf("nigga") != -1 || userMsg.indexOf("nigbag") != -1 || userMsg.indexOf("nword") != -1 || userMsg.indexOf("n-word") != -1 || userMsg.indexOf("n word") != -1 || userMsg.indexOf("czarnuch") != -1){
		message.react('👎🏿')
	}
})

client.login(process.env.token);
