const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json')

module.exports = (client,mongoose)=>{
    client.on("message",(message) =>{
        if(message.content.startsWith(`${prefix}verify `)){
            let tag = message.content.replace(`${prefix}verify `,'');
            if(tag.startsWith('<')){
                tag = tag.replace('<@!',"")
                tag = tag.replace('>',"")
            }
            const discordId = tag.substr(0,18)
            tag = tag.slice(19).toUpperCase()
            fetch(reqUrl+tag,options)
            .then(res=>res.json())
            .then(json=>{
                const clubTag = json.club.tag.slice(1)
                Player.findOneAndUpdate({discordId},
                    {
                    discordId,
                    playerTag:tag,
                    playerClubTag: clubTag
                    },
                    {
                        upsert : true,
                    },(err,player)=>{
                        if(!err){
                            message.channel.send("Saved successfully")
                        }
                        else {
                            message.channel.send("Failed to push to database")
                        }
                    })
                const member = message.guild.members.cache.find(member=>member.id==discordId);
                if(global.clubTags.includes(clubTag)){
                    const role = message.guild.roles.cache.find(role=> role.name=='Relics');
                    member.roles.add(role)
                }
                else {
                    member.roles.add(message.guild.roles.cache.find(role=> role.name=='Guest'))
                }
            })
            .catch(e=>message.channel.send("Please enter a valid tag"))
        }
    })
}