const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const commands = require('./commands/commands.js');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString,{useNewUrlParser: true,useUnifiedTopology:true});
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected',()=>{
  console.log("Connected to MongoDB..");
});

client.on('ready',()=>{
    console.log(client.user.username + ' is logged in');
})

commands(client,mongoose)

client.login(config.token)
