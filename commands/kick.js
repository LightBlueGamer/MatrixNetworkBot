const {MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'kick',
	description: 'Kicks a member',
  category: 'Mod', //Mod  Info  System
  staffOnly: true,
  invisible: false,
	execute(message, args, client) {
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLowerCase()) || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = 'No reason specified.'
    
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle('Missing parameter')
      .setDescription('Missing first parameter (member)')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(!message.member.permissions.has('KICK_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('You dont have the `KICK_MEMBERS` permission')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(!message.guild.me.permissions.has('KICK_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('I dont have the `KICK_MEMBERS` permission')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(!member){
      const embed = new MessageEmbed()
      .setTitle('No member was found')
      .setDescription(`I couldnt find any member from ${args[0]}`)
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(member.roles.highest.position > message.member.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('You dont have high enough permissions to kick this member')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(member.roles.highest.position > message.guild.me.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('I dont have high enough permissions to kick this member')
      .setColor('RED')
      return message.channel.send(embed)
    };
    
    async function kick() {
      const membed = new MessageEmbed()
      .addField('Kicked', 'You have been kicked from the server')
      .addField('Reason', reason)
      .addField('Staff', message.member.displayName)
      
      const sembed = new MessageEmbed()
      .setTitle('Member was kicked')
      .addField('Member', member.displayName)
      .addField('Reason', reason)
      .addField('Staff', message.member.displayName)
      
      await member.send(membed).catch(async (err) => {
        await member.kick()
        message.channel.send(sembed)
      })
      await member.kick()
      message.channel.send(sembed)
    };
    kick()
	},
};