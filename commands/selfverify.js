const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json')

module.exports = (client,mongoose)=>{
    client.on("message",(message) =>{
        if(message.content===(`${prefix}verify`)){
            const discordId = message.member.id;
            let currPlayer;
            Player.findOne({discordId})
            .then(player=>{
                currPlayer = player;
                fetch(reqUrl+player.playerTag,options)
            })
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
                if(json.club.tag!=currPlayer.playerTag){
                    message.channel.send("Role change required")
                }
                else message.channel.send("All good")
            })
            .catch(e=>message.channel.send("You do not have a stored tag"))
        }
    })
}