module.exports = {
	name: 'reload',
	description: 'reload',
  category: 'System', //Mod  Info  System
  staffOnly: false,
  invisible: true,
	execute(message, args, client) {
  
    if(!args || args.length < 1) return message.channel.send("Please provide a command to reload.");
    const commandName = args[0];
    if(!client.commands.has(commandName)) {
      return message.channel.send("That command does not exist");
    }
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.channel.send(`The command ${commandName} has been reloaded`);
    
	},
};