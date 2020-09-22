const {MessageEmbed} = require('discord.js');

module.exports = async (client, message) => {
  client.xp.ensure(message.author.id, {
    xp: 0,
    level: 1,
    user: message.author.id
  });
  
  const points = Math.floor(Math.random() * 40 + 10);
  
  client.xp.math(message.author.id, '+', points, 'xp')
  
  const curLevel = client.xp.get(message.author.id, 'level');
  const nxtLevel = curLevel * 500;
  const curXp = client.xp.get(message.author.id, 'xp');
  
  if(curXp >= nxtLevel){
    client.xp.inc(message.author.id, 'level')
    const embed = new MessageEmbed()
    .setTitle('Level up!')
    .setDescription(`${message.member.toString()} just leveled up to level: ${client.xp.get(message.author.id, 'level')}!`)
    .setColor('RANDOM')
    
    message.channel.send(embed)
  };
};