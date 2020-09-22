const { prefix } = require('../config.json');
const {MessageEmbed} = require('discord.js');
const roles = require('../roles.json')

module.exports = {
	name: 'testhelp',
	description: 'List all of my commands or info about a specific command.',
  category: 'Info', //Mod  Info  System
  staffOnly: false,
  invisible: false,
	execute(message, args, client) {
    let {commands} = message.client;
    
    if(!message.member.roles.cache.has(roles.staff.id)) {
      commands = commands.filter(c => !c.staffOnly) 
    };
    if(message.member.id !== '232466273479426049') {
      commands = commands.filter(c => !c.invisible)
    };
    
    const arr = [];
    commands.forEach(c => {
      if(arr.includes(c.category)) return;
      else arr.push(c.category)
    });
    
    if(!args[0]){
    
      const embed = new MessageEmbed()
      .setTitle(`${client.user.username}'s commands`)
      arr.forEach(c => {
        embed.addField(`**${c.toUpperCase()}**`, commands.filter(cmd => cmd.category === c).map(c => c.name.replace(c.name.charAt(0), c.name.charAt(0).toUpperCase())).join('\n'), true)
      });
      embed.setFooter(`Requested by: ${message.author.tag}`)
    
      message.channel.send(embed)
    };
    
    const arg = args[0].replace(args[0].charAt(0), args[0].charAt(0).toUpperCase());
    
    if(arr.includes(arg)) {
      const cat = args[0].replace(args[0].charAt(0), args[0].charAt(0).toUpperCase())
      const embed = new MessageEmbed()
      .setTitle(cat)
      .setDescription(`${commands.filter(c => c.category === cat).map(c => `${c.name.replace(c.name.charAt(0), c.name.charAt(0).toUpperCase())}: ------ :${c.description.replace(c.description.charAt(0), c.description.charAt(0).toUpperCase())}`).join('.\n')}`)
      .setFooter(`Requested by: ${message.author.tag}`)
      
      message.channel.send(embed)
    };
    
    if(commands.has(args[0])){
      const command = commands.get(args[0])
      const embed = new MessageEmbed()
      .setTitle(arg)
      .addField('Info', command.description, true)
      .addField('\u200b', '\u200b', true)
      .addField('Category', command.category, true)
      .addField('Staff Command', command.staffOnly, true)
      .addField('\u200b', '\u200b', true)
      .addField('Invisible', command.invisible, true)
      .setFooter(`Requested by: ${message.author.tag}`)
      
      message.channel.send(embed)
    };
	},
};