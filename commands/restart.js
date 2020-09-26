const config = require('./../config.json');
const {prefix, myId} = config;

module.exports = (client)=>{
    client.on("message",message=>{
        if(message.content.startsWith(`${prefix}restart`)&&message.author.id==myId){
            client.destroy()
            client.login(config.token)
        }
    })
}