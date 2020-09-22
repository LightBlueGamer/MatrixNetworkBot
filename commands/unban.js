const {MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'unban',
	description: 'unbans a member',
  category: 'Mod', //Mod  Info  System
  staffOnly: true,
  invisible: false,
	execute(message, args, client) {
    async function unban() {
      if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Missing Parameter')
        .setDescription('Missing first parameter (id)')
        .setColor('RED')
        return message.channel.send(embed)
      };
      if(args[0].match('/\d{17,20}/g')){
        const embed = new MessageEmbed()
        .setTitle('Invalid Parameter')
        .setDescription('The first parameter should be the ID of a user')
        .setColor('RED')
        return message.channel.send(embed)
      };
      const bans = await message.guild.fetchBans()
      const user = bans.filter(sf => sf.user.id === args[0] || sf.user.username.toLowerCase() === args[0].toLowerCase() || sf.user.tag.toLowerCase() === args[0].toLowerCase()).first()
            
      if(!user){
        const embed = new MessageEmbed()
        .setTitle('No User')
        .setDescription('No user was found from '+args[0])
        .setColor('RED')
        return message.channel.send(embed)
      };
      
      await message.guild.members.unban(user.user.id)
      
      let reason = args.slice(1).join(' ');
      if(!reason) reason = 'No reason specified'
      
      const embed = new MessageEmbed()
      .setTitle('Member Unbanned')
      .addField('Member', user.user.username)
      .addField('Staff', message.member.displayName)
      .addField('Reason', reason)
      message.channel.send(embed)
    };
    unban()
  },
};