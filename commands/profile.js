const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');

module.exports = (client,mongoose)=>{
    client.on("message",(message) =>{
        if(message.content.startsWith(`${prefix}profile`)){
            let tag = message.content.replace(`${prefix}profile `,'');
            if(tag.startsWith('<')){
                tag = tag.replace('<@!',"")
                tag = tag.replace('>',"")
            }
            Player.findOne({discordId:tag})
            .then(player=>fetch(reqUrl+player.playerTag,options))
            .then(res=>res.json())
            .then(json=>{
                const embed = new Discord.MessageEmbed()
                .setColor(colourCode)
                .setThumbnail(iconUrl)
                .setTitle(`${json.name} | ${json.tag}`)
                .addField('Trophies',json.trophies)
                .addField('Club',json.club.name)
                .addField('Highest trophies',json.highestTrophies)
                .addField('Level',json.expLevel)
                .addField('3v3 wins',json['3vs3Victories'])
                .addField('Solo Wins',json.soloVictories)
                .addField('Duo Wins',json.duoVictories)
                message.channel.send(embed)
            })
            .catch(e=>message.channel.send("The user does not have a stored tag"))
        }
    })
}