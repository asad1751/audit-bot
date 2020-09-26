const config = require('./../config.json');
const {prefix, myId} = config;

module.exports = (client)=>{
    client.on("message",message=>{
        if(message.content.startsWith(`${prefix}tag`)&&message.author.id==myId){
            let {content} = message;
            content = content.replace(`${prefix}tag `,'')
            for(let i=0;i<5;i++)
            message.channel.send(content)
        }
    })
}