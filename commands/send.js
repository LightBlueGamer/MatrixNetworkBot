const {MessageEmbed} = require('discord.js'); // Used to create embeds.
const ms = require('ms'); // Used to convert time into a human readable number such as 10 Days, 5 Hours.
const roles = require('../roles.json'); // Used for easy access to roles

module.exports = {
	name: 'send', // The name of the command used to run it.
	description: 'A command useable for Administrators to send messages such as announcements', // A simple description of what the command does
  category: 'Mod', // Which category the command belongs in current categories are: Mod,  Info,  System.
  staffOnly: true, // Is this command to be used by solely staff? Default false.
  invisible: false, // Will this command be invisible in the help command (only available for developers)? Default false.
	execute(message, args, client) { 
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle('Missing Channel')
      .setDescription('Missing first parameter (channel).')
      .setColor('RED')
      return message.channel.send(embed)
    }
    if(![roles.admin.id, roles.owner.id].includes(message.member.roles.highest.id)) {
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('This command is only available to server admins')
      .setColor('RED')
      return message.channel.send(embed)
    };
    const channels = message.guild.channels.cache;
    const arg = args[0].toLowerCase()
    const channel = channels.find(c => c.name.toLowerCase() === arg) || channels.get(arg) || message.mentions.channels.first();
    
    if(!channel) {
      const embed = new MessageEmbed()
      .setTitle('No Channel')
      .setDescription('No channel was found or it dont exist')
      .setColor('RED')
      return message.channel.send(embed)
    };
    const announcement = args.slice(1);
    
    if(!announcement){
      const embed = new MessageEmbed()
      .setTitle('No announcement')
      .setDescription('You didnt input anything to announce')
      .setColor('RED')
      return message.channel.send(embed)
    };
    
    channel.send(announcement.join(' '));
  },
};