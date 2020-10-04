const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json');
const fverify = require('../audit/fverify');
const faudit = require('../audit/faudit');

module.exports = client => {
    client.on("message", async (message) => {
        if(message.content===`${prefix}audit`&&message.author.id==myId){
            message.channel.send("Audit currently disabled")
            // message.guild.members.fetch()
            // .then(guildMembers => {
            //     guildMembers = [...guildMembers.keys()];
            //     faudit(guildMembers,message);
            // })
        }
    })
}