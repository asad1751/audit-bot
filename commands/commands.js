const config = require('./../config.json')
const ping = require('./ping.js')
const tag = require('./tag.js')
const logout = require('./logout.js')
const restart = require('./restart.js')
const profile = require('./profile.js')
const verify = require('./verify.js')
const selfverify = require('./selfverify.js')

module.exports = (client,mongoose) =>{
    ping(client)
    tag(client)
    logout(client)
    restart(client)
    profile(client,mongoose)
    verify(client,mongoose)
    selfverify(client,mongoose)
}