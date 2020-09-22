const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require('enmap');
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.verification = new Enmap({name: 'Verification'});

client.events = new Enmap({name: 'Events'});

client.roles = new Enmap({name: 'Roles'});

client.bans = new Enmap({name: 'Bans'});

client.xp = new Enmap({name: 'Xp'});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Attempting to load event ${eventName}`)
    client.on(eventName, event.bind(null, client));
    client.events.set(eventName)
  });
  console.log(`Loaded ${client.events.size} events.`)
});


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



client.login(token)

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, res) => {
  res.send('Yup nothing here')
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://the-bartender-bot.glitch.me/`);
}, 280000);
