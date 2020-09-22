module.exports = async (client, message) => {
  client.verification.keys().forEach(k => {
    const eTime = client.verification.get(k, 'endtime')
    const d = new Date();
    const curTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    if(curTime >= eTime){
      client.verification.delete(k.key)    
    };
  });
  
  client.bans.keys().forEach(k => {
    let unbanTime = client.bans.get(k, 'unbanTime');
    let curTime = new Date();
    curTime = Date.parse(curTime)
    const diff = unbanTime - curTime
    
    if(diff <= 0){
      async function unban() {
        const user = await client.users.fetch(client.bans.get(k, 'user'))
        message.guild.unban(user)
      };
      unban()
    } else {
      client.bans.set(k, diff, 'unbanTime');
      
      client.setTimeout(async() => {
        const user = await client.users.fetch(client.bans.get(k, 'user'));
        message.guild.unban(user)
      }, client.bans.get(k, 'unbanTime'))
    };
  });
};