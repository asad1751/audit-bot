const config = require('./../config.json');
const {prefix} = config;

module.exports = client=>{
    client.on("message",message=>{
        if(message.content.startsWith(`${prefix}ping`)){
            message.channel.send("Pong");
        }
    })
}