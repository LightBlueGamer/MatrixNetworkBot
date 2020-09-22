module.exports = async (client, guild) => {
  client.roles.ensure(guild.id, {
    roles: []
  });
  
  guild.roles.cache.each(r => {
    client.roles.push(guild.id, r.id, 'roles', false)
  });
};