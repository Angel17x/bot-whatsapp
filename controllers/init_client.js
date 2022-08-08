const { config } = require('dotenv');
const { Client, LocalAuth } = require('whatsapp-web.js');

config();

console.log("esta iniciando el cliente")
let client = new Client({ 
    authStrategy: new LocalAuth({
        clientId: process.env.CLIENT_ID || "paguetodo_client"
    })
});


module.exports = client;