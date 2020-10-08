const {prefix, myId, brawlToken, iconUrl, colourCode, clubReqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json');
const updatelb = require('./updatelb');


module.exports =  client =>{
    client.on('ready',()=>{
        const guild = client.guilds.cache.get('537309674341400577');
        guild.channels.cache.get('763893287483867167').messages.fetch('763895051616256030')
        .then(message=>{
            setInterval(()=>{
                updatelb(message)
            },15000)
        })
    })
}