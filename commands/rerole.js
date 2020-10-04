const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('../config.json');
const fetch = require('node-fetch');
const Player = require('../models/playerModel.js');
const Discord = require('discord.js');
const options = require('../options.json');
const global = require('../global.json')
const fverify = require('../audit/fverify')

module.exports = client =>{
    client.on("message",(message) =>{
        if(message.content===(`${prefix}rerole`)){
            const discordId = message.member.id;
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
                    // if(json.club.tag.slice(1)!=currPlayer.playerClubTag){
                        currPlayer.playerClubTag=json.club.tag.slice(1);
                        fverify(message,currPlayer)
                    // }
                    // else message.channel.send("You do not require a role change")
                })
                .catch(e=>message.channel.send("1You do not have a stored tag"))
            })
            .catch(e=>message.channel.send("You do not have a stored tag"))
        }
    })
}