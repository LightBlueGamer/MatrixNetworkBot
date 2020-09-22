const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'ping',
	description: 'Shows bot ping',
  category: 'Info', //Mod  Info  System
  staffOnly: true,
  invisible: false,
	execute(message, args, client) {
    
    let heart = Math.floor(client.ws.ping)
    let ping = new Date().getTime() - message.createdTimestamp
  
    let embed = new Discord.MessageEmbed()
    .setDescription(`${ms(heart)} :heartbeat: \n${ping}ms ping`)
    
    message.channel.send(embed)
    
	},
};