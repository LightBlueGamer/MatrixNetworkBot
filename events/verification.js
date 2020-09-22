module.exports = async (client, message) => {
  let verifications = ['verify'];
  let verificationWords = [];
  client.verification.forEach(k => {
    verifications.push(client.verification.get(k.key, 'verification'))
    verificationWords.push(client.verification.get(k.key, 'verification'))
  });
  
  if(!verifications.includes(message.content.toLowerCase())){
    return message.delete({timeout: 0})
  } else if(verificationWords.includes(message.content.toLowerCase())){
    message.delete({timeout: 0})
    return message.member.roles.add('756873187085778955')
  };
  
  let string = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 8);
  let d = new Date();
  const key = `${message.member.id}:${message.id}`;
  try {
    message.member.send(string);
    message.member.send("You have 5 minutes to type the code in the verification channel failing to do so will reset your verification");
    client.verification.ensure(key, {
      endtime: `${d.getHours()}:${d.getMinutes() + 5}:${d.getSeconds()}`,
      verification: string,
      key: key
    });

    client.setTimeout(() => {
      message.member.send('Your verification has timed out.')
      client.verification.delete(`${client.verification.get(key, "key")}`);
    }, 5 * 60 * 1000);
  } catch {
    message.channel
      .send(`You're DM's are disabled please enable them on this server and type 'verify' again.`)
      .then(m => m.delete({ timeout: 10000 }));
  }
  message.delete({timeout: 0})
};
