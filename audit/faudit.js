const {prefix, myId, brawlToken, iconUrl, colourCode,reqUrl} = require('../config.json');
const fetch = require('node-fetch');
const Player = require('../models/playerModel.js');
const Discord = require('discord.js');
const options = require('../options.json');
const global = require('../global.json');
const fverify = require('./fverify');
const frerole = require('./frerole');

module.exports = (guildMembers, message) => {
    const urole = message.guild.roles.cache.find(role=> role.name=='Unverified');
    const vrole = message.guild.roles.cache.find(role=> role.name=='Verified');
    const erole = message.guild.roles.cache.find(role=> role.name=='Events');
    for(let i=0;i<guildMembers.length;i++){
        let discordId = guildMembers[i];
        if(discordId==myId) continue;
        setTimeout(()=>frerole(message,discordId,urole,vrole,erole),i*100);
    }
}
