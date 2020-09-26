const mongoose = require('mongoose')
const {connectionString} = require('./config.json')

module.exports = async () => {
    await mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology:true
        });
    return mongoose;
}