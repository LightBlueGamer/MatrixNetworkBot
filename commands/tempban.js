const {MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'tempban',
	description: 'temporary bans a member',
  category: 'Mod', //Mod  Info  System
  staffOnly: true,
  invisible: false,
	execute(message, args, client) {
    
    
    
    if(!args[0]){
      const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('Missing Parameter')
      .setDescription('Missing first parameter (user)')
      
      return message.channel.send(embed)
    };
    
    if(!args[1]){
      const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('Missing Parameter')
      .setDescription('Missing second parameter (time)')
      
      return message.channel.send(embed)
    };
    
    let member;
    
    message.guild.members.fetch().then(m => {
      member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLowerCase());
    });
 
    if(!member) {
      const embed = new MessageEmbed()
      .setTitle('No Member')
      .setDescription(`No member could be found form ${args[0]}`)
      .setColor('RED')
      
      return message.channel.send(embed);
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
    
    if(member.roles.highest.position >= message.member.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('Immune')
      .setDescription('The member you are trying to ban have a higher role than you have')
      .setColor('RED')
      
      return message.channel.send(embed)
    };
    
    if(member.roles.highest.position >= message.guild.me.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('Immune')
      .setDescription('The member you are trying to ban have a higher role than i have')
      .setColor('RED')
      
      return message.channel.send(embed)
    };
    
    if(!args[1].match('/\d{1,100}(s|m|h|d) /i')){
      const embed = new MessageEmbed()
      .setTitle('Invalid Time')
      .setDescription('Your second parameter should be a time i.e: 10s for 10 seconds')
    };
    
    let multipliers;
    let unbanTime = new Date();
    let time = parseInt(args[1].replace('/(s|m|h|d)/i', ''));
    
    if(args[1].includes('s')) {
      multipliers = time * 1000;
      unbanTime.setSeconds(unbanTime.getSeconds()+time)
    };
    if(args[1].includes('m')) {
      multipliers = time * 1000;
      unbanTime.setMinutes(unbanTime.getMinutes()+time)
    };
    if(args[1].includes('h')) {
      multipliers = time * 1000;
      unbanTime.setHours(unbanTime.getHours()+time)
    };
    if(args[1].includes('d')) {
      multipliers = time * 1000;
      unbanTime.setDays(unbanTime.getDays()+time)
    };
        
    let reason = args.slice(2).join(' ');
    
    async function tempban() {
      const membed = new MessageEmbed()
      .addField('Kicked', 'You have been banned from the server')
      .addField('Reason', reason)
      .addField('Staff', message.member.displayName)
      
      const sembed = new MessageEmbed()
      .setTitle('Member was banned')
      .addField('Member', member.displayName)
      .addField('Reason', reason)
      .addField('Staff', message.member.displayName)
      
      client.bans.ensure(message.author.id, {
        unbanTime: Date.parse(unbanTime),
        user: client.users.cache.get(member.id)
      });
      
      await member.send(membed).catch(async (err) => {
        await member.ban()
        client.setTimeout(async () => {
          const bans = await message.guild.fetchBans();
          const user = bans.filter(sf => sf.user.id === args[0] || sf.user.username.toLowerCase() === args[0].toLowerCase() || sf.user.tag.toLowerCase() === args[0].toLowerCase()).first()
          
          message.guild.unban(user)
        }, Date.parse(unbanTime));
        return message.channel.send(sembed)
      });
      await member.ban()
      client.setTimeout(async () => {
        const bans = await message.guild.fetchBans();
        const user = bans.filter(sf => sf.user.id === args[0] || sf.user.username.toLowerCase() === args[0].toLowerCase() || sf.user.tag.toLowerCase() === args[0].toLowerCase()).first()
          
        message.guild.unban(user)
      }, Date.parse(unbanTime));
      message.channel.send(sembed)
    };
    
    tempban()
	},
};