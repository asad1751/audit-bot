const {prefix, myId, brawlToken, iconUrl, colourCode, clubReqUrl} = require('./../config.json');
const fetch = require('node-fetch');
const Player = require('./../models/playerModel.js');
const Discord = require('discord.js');
const options = require('./../options.json');
const global = require('./../global.json');
const moment = require('moment-timezone');

function Comp(a,b){
    if(a.trophies<b.trophies) return 1;
    if(a.trophies>b.trophies) return -1;
    return 0;
}

module.exports =  async (message) =>{
            let n=20;
            const clubTags = global.clubTags;
            const promises = [];
            clubTags.forEach(clubTag=>{
                const promise = fetch(clubReqUrl+clubTag+"/members",options);
                promises.push(promise);
            });
            const returnValues = await Promise.all(promises);
            const returnValues2 = [];
            returnValues.forEach(res=>{
                returnValues2.push(res.json());
            });
            const clubMembers = await Promise.all(returnValues2);
            const players = [];
            clubMembers.forEach(club=>{
                club.items.forEach(player=>{
                    players.push(player);
                })
            });
            players.sort(Comp);
            let print = "";
            for(let i=0;i<n&&i<players.length;i++){
                const {name, trophies,tag} = players[i];
                print+=`${i+1}) ${name} - ${trophies}\n`;
            }
            // message.edit(print);
            const embed = new Discord.MessageEmbed()
                .setColor(colourCode)
                .setThumbnail(iconUrl)
                .setTitle(`Relics Leaderboard`)
                .setDescription(print)
                .setFooter(`Last update at ${moment().tz('Asia/Kolkata').format("hh:mm:ss")}`)
            message.edit(embed)
}