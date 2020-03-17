const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "%"

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

var myLife = 0;
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
	//variables that get declared every message
	var userMsg = message.content.toLowerCase();
	var targetID;
	var targetMention;

	function postOMLEmbed(){
		if (command.length > 1) //if there are more than 1 things in the command array
			if(!isNaN(command[1])) //if the 2nd value is a number
				myLife = command[1]; //set the 2nd value to the counter (setoml command)
			else{//if the 2nd value isnt a number
				message.channel.send("Please enter a valid number!")
				return;
			}
		else if (command[0] == "oml")//if the command is just oml
			myLife++;//add one to the counter
		const omlEmbed = new Discord.RichEmbed()//create embed
		.setColor('#fae739')
		.setTitle('Number of things on my life:')
		.setDescription(myLife)

		message.channel.send(omlEmbed)//send embed
	}

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

	function findID(){
		try{
			var mentionID = command[1]//grab the mentioned person's ID with the <@! and >
			if (mentionID.startsWith('<@') && mentionID.endsWith('>')){//if the ID starts with <@ and ends with >
				mentionID = mentionID.slice(2, -1);//cuts off the <@ and >
				if (mentionID.startsWith('!')){//if the ID still starts with the ! (caused by custom nicknames)
					mentionID = mentionID.substring(1);//cuts off the ! in the beginning
				}
			}
			return mentionID;//return with that pure ID number
		}
		catch(error){
			message.channel.send("Make sure you mentioned a user!");
			console.log(error);
			return;
		}
	}

	function findMention(ID){
		return message.guild.members.get(ID);
	}

	if (message.content.startsWith(`${prefix}`)) {		
		irvinID = message.guild.members.get("398613568213483521");
		hasModRole = message.member.roles.has(modRole);
		var command = userMsg.substring(prefix.length).split(" ");
		if(command[0] == "cough") {
			var roleMembers = message.guild.roles.get("543187460021288960").members();
			var r = Math.round(Math.random() * (roleMembers.size - 1));
			message.channel.send(roleMembers[r]);
		}
		if (hasModRole){	
			if(command[0] == "oml" || command[0] == "count" || command[0] == "setoml"){ //if the command is either of these
				postOMLEmbed() //call the function to create and post the embed
				message.guild.channels.get('645817145007144981').send(findMention(message.author.id) + " changed the OML counter");
				return;
			}
			try{
				if(command[0] == "mute"){
					if (command.length > 1){
						targetID = findID();
						message.guild.members.get(targetID).addRole('549064305807589387');
						message.guild.members.get(targetID).removeRole(intelRole);
						const muteEmbed = new Discord.RichEmbed()
						.setColor('#fae739')
						.setTitle(message.guild.members.get(targetID).displayName + " is now muted")
						.setThumbnail(message.guild.members.get(targetID).user.avatarURL)

						message.channel.send(muteEmbed)
						message.guild.channels.get('645817145007144981').send(findMention(message.author.id) + " muted " + command[1]);
						return;
					}
					else {
						irvinID.addRole('549064305807589387');
						irvinID.removeRole(intelRole)
						const imuteEmbed = new Discord.RichEmbed()
						.setColor('#fae739')
						.setTitle("Irvin is now muted")
						.setThumbnail(irvinID.user.avatarURL)

						message.channel.send(imuteEmbed)
						message.guild.channels.get('645817145007144981').send(findMention(message.author.id) + " muted Irvin");
						return;
					}
				}
				else if(command[0] == "unmute"){
					if (command.length > 1){
						targetID = findID();
						message.guild.members.get(targetID).removeRole('549064305807589387');
						message.guild.members.get(targetID).addRole(intelRole);
						const unmuteEmbed = new Discord.RichEmbed()
						.setColor('#fae739')
						.setTitle(message.guild.members.get(targetID).displayName + " is now unmuted")
						.setThumbnail(message.guild.members.get(targetID).user.avatarURL)

						message.channel.send(unmuteEmbed)
						message.guild.channels.get('645817145007144981').send(findMention(message.author.id) + " unmuted " + command[1]);
						return;
					}
					else {
						irvinID.removeRole('549064305807589387');
						irvinID.addRole(intelRole)
						const iunmuteEmbed = new Discord.RichEmbed()
						.setColor('#fae739')
						.setTitle("Irvin is now unmuted")
						.setThumbnail(irvinID.user.avatarURL)

						message.channel.send(iunmuteEmbed)
						message.guild.channels.get('645817145007144981').send(findMention(message.author.id) + " unmuted Irvin");
						return;
					}
				}
			}
			catch(error){
				console.log(error);
				message.channel.send("Unable to mute. \nMake sure you correctly mentioned a user!")
				return;
			}
			if(command[0] == "joke"){
				randomNum = Math.random();
				randomNum *= 82;
				randomNum = Math.ceil(randomNum);
				message.channel.send(jokes[randomNum]);
				return;
			}
			if(command[0] == "itime"){
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
				return;
			}
		}
		else{
		message.channel.send("You are too stupid for this command!");
		return;
		}
		if(command[0] == "massage"){
			if(command.length > 1) //if there are more than 1 things in the command array
				targetMention = command[1];	//the mentioned user
			else //if there are less than 1 things in the command array
				targetMention = message.guild.members.get(message.author.id); //use the author's mention tag
			randomNum = Math.random() * 100;
			if(randomNum > 50 ){
				message.channel.send(targetMention + " has some nasty feet");
				message.channel.send({files :  ["https://tenor.com/view/toenails-fail-feet-pedicure-trendizisst-gif-14641265.gif"]})
			}
			else{
				message.channel.send(targetMention + " has some tasty toes");
				message.channel.send({files :  ["https://media.giphy.com/media/CzMfYqt8oomnm/giphy.gif"]})
			}
			return;
		}
	}

	if(userMsg.startsWith(`can a kangaroo jump higher than a house`)){
		message.channel.send("Of course! Houses can't jump!");
		return;
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
