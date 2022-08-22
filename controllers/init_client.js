const { config } = require('dotenv');
const { Client, LocalAuth } = require('whatsapp-web.js');
const ora = require('ora');
const { chalk } = require('chalk');
config();

let client = new Client({ 
    authStrategy: new LocalAuth({
        clientId: process.env.CLIENT_ID || "paguetodo_client"
    })
});


module.exports = client;