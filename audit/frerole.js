const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json');
const fverify = require('./fverify')

module.exports = (message, discordId,urole,vrole,erole)=>{
    Player.findOne({discordId},(err,player)=>{
        if(!err){
            if(player!=null){
                const member = message.guild.members.cache.find(member=>member.id==player.discordId);
                member.roles.remove(urole);
                member.roles.add(vrole);
                member.roles.add(erole);
                const currPlayer = player;
                fetch(reqUrl+player.playerTag,options)
                .then(res=>res.json())
                .then(json=>{
                    console.log(json.name);
                    member.setNickname(json.name);
                    if(json.club.tag==undefined){
                        currPlayer.playerClubTag = "No Club";
                    }
                    else currPlayer.playerClubTag=json.club.tag.slice(1);
                    fverify(message,currPlayer);
                })
                .catch(e=>console.log(e))
            }
        }
    })
}