const {MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'ban',
	description: 'bans a member',
  category: 'Mod', //Mod  Info  System
  staffOnly: true,
  invisible: false,
	execute(message, args, client) {
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLowerCase()) || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = 'No reason specified.'
    
    if(!member){
      if(!args[0].match(/\d{17,20}/g)){
        const embed = new MessageEmbed()
        .setTitle('Invalid Parameter')
        .setDescription('No member was found on the server, banning people thats not in the server requires their ID')
        .setColor('RED')
        return message.channel.send(embed)
      };
      message.guild.members.ban(args[0])
      return message.channel.send(`Banned member with ID ${args[0]}`)
    };
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle('Missing parameter')
      .setDescription('Missing first parameter (member)')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(!message.member.permissions.has('BAN_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('You dont have the `BAN_MEMBERS` permission')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(!message.guild.me.permissions.has('BAN_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('I dont have the `BAN_MEMBERS` permission')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(member.roles.highest.position > message.member.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('You dont have high enough permissions to ban this member')
      .setColor('RED')
      return message.channel.send(embed)
    };
    if(member.roles.highest.position > message.guild.me.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('Missing Permissions')
      .setDescription('I dont have high enough permissions to ban this member')
      .setColor('RED')
      return message.channel.send(embed)
    };
    
    async function ban() {
      const membed = new MessageEmbed()
      .addField('Kicked', 'You have been banned from the server')
      .addField('Reason', reason)
      .addField('Staff', message.member.displayName)
      
      const sembed = new MessageEmbed()
      .setTitle('Member was banned')
      .addField('Member', member.displayName)
      .addField('Reason', reason)
      .addField('Staff', message.member.displayName)
      
      await member.send(membed).catch(async (err) => {
        await member.ban()
        return message.channel.send(sembed)
      })
      await member.ban()
      message.channel.send(sembed)
    };
    ban()
	},
};