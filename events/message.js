const {prefix} = require('../config.json');

module.exports = async (client, message) => {
  
  if(message.channel.id === '756974812668231810'){
    return client.emit('verification', message)
  };
  
  if(message.channel.type !== 'dm') client.emit('xp', message)
    
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
	const command = args.shift();

  if(!client.commands.has(command)) return;
  
  const cmd = client.commands.get(command);
  
  if(cmd.staffOnly && !message.member.roles.cache.has('756873032676671498')) return;
  if(cmd.invisible && message.member.id !== '232466273479426049') return;

  try {
	  client.commands.get(command).execute(message, args, client);
  } catch (error) {
	console.error(error);
  }
}