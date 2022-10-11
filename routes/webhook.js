const express = require("express");
const qrcode = require("qrcode");
const { WebhookClient } = require("dialogflow-fulfillment");
const webhook = express.Router();

webhook.post("/", (req, res) => {
    const agent = new WebhookClient({request: req, response: res});
    function welcome(agent){
        agent.add("welcome to my agent");
    }
    function solicitar_servicio(agent){
        agent.add("Que servicio desea pagar?");
    }
    let intentMap = new Map();
    intentMap.set("welcome", welcome);
    intentMap.set("solicitar_servicio", solicitar_servicio);

    agent.handleRequest(intentMap)
   if(req.body!=null){
        console.log(req.body);
   }
})
module.exports = webhook;