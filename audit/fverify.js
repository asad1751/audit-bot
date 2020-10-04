const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json');

module.exports = (message, currPlayer)=>{
    const discordId = currPlayer.discordId;
    Player.findOneAndUpdate({discordId},
        {
            discordId,
            playerTag: currPlayer.playerTag,
            playerClubTag: currPlayer.playerClubTag
        },(err,player)=>{
            if(!err){
                const rrole = message.guild.roles.cache.find(role=> role.name=='Relics');
                const grole = message.guild.roles.cache.find(role=> role.name=='Guest');
                const member = message.guild.members.cache.find(member=>member.id==discordId);
                member.roles.remove(rrole);
                member.roles.remove(grole);
                if(global.clubTags.includes(currPlayer.playerClubTag)){
                    member.roles.add(rrole);
                }
                else member.roles.add(grole);
                message.channel.send(`Roles successfully updated for ${member.user.username}`)
            }
            else {
                message.channel.send("Error! Failed to update role")
            }
        })
}