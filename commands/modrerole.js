const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('../config.json');
const fetch = require('node-fetch');
const Player = require('../models/playerModel.js');
const Discord = require('discord.js');
const options = require('../options.json');
const global = require('../global.json')
const fverify = require('../audit/fverify')

module.exports = client =>{
    client.on("message",(message) =>{
        if(message.content.startsWith(`${prefix}rerole `)&&message.member.hasPermission('MANAGE_ROLES')){
            let discordId = message.content.replace(`${prefix}rerole `,'');
            if(discordId.startsWith('<')){
                discordId = discordId.replace('<@!',"")
                discordId = discordId.replace('>',"")
            }
            discordId = discordId.replace('<@',"")
            let currPlayer;
            Player.findOne({discordId})
            .then(player=>{
                if(player==undefined) {
                    message.channel.send("You do not have a stored tag")
                    return;
                }
                const urole = message.guild.roles.cache.find(role=> role.name=='Unverified');
                const vrole = message.guild.roles.cache.find(role=> role.name=='Verified');
                const erole = message.guild.roles.cache.find(role=> role.name=='Events');
                const member = message.guild.members.cache.find(member=>member.id==player.discordId);
                member.roles.remove(urole);
                member.roles.add(vrole);
                member.roles.add(erole);
                currPlayer = player;
                fetch(reqUrl+player.playerTag,options)
                .then(res=>res.json())
                .then(json=>{
                    // console.log(currPlayer)
                    member.setNickname(json.name);
                    currPlayer.playerClubTag=json.club.tag.slice(1);
                    fverify(message,currPlayer)
                })
                .catch(e=>message.channel.send("You do not have a stored tag"))
            })
            .catch(e=>message.channel.send("You do not have a stored tag"))
        }
    })
}