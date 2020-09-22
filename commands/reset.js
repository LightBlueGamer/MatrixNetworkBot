const {MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'reset',
	description: 'resets a channel to clear of all messages',
  category: 'Mod', //Mod  Info  System
  staffOnly: true,
  invisible: false,
	execute(message, args, client) {
    if(!message.member.permissions.has('MANAGE_CHANNELS')){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('You dont have the `MANAGE_CHANNELS` permission required')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(!message.guild.me.permissions.has('MANAGE_CHANNELS')){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('I dont have the `MANAGE_CHANNELS` permission required')
      .setColor('RED')
      return message.channel.send(embed)
    };
    message.channel.clone().then(c => c.send('Channel has been reset.'))
    message.channel.delete()
  },
};