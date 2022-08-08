const controllerMessage = {};
const saveHistory = require('./save_history');
const client = require('./init_client');
const { MessageMedia, List } = require('whatsapp-web.js');
const services = require('../config/services');

controllerMessage.sendMessage = (to, message) => {
    client.sendMessage(to, message)
}
controllerMessage.sendMedia = async (to, file) => {
    const media = MessageMedia.fromFilePath(`./images/${file}`)
    await client.sendMessage(to, media);
}
controllerMessage.messages = (msg) => {
    services()

    const { from, to, body } = msg;
    console.log(from, to, body);
    let init = ["Hola", "hola", "hola, como estas?", "hola, cómo estás?", "como estas?"];
    let end = ["gracias", "adios", "hasta luego", "Adios", "Adiós", "Gracias", "Hasta luego"];
    if(init.find(x => x === body)){
        // controllerMessage.sendMedia(from, 'logo-paguetodo.png');
        controllerMessage.sendMessage(from, "Hola bienvenido al bot 🤖 de pagos de servicios de Paguetodo C.A. en que puedo ayudarte?");
        const productsList = new List(
            "Telecomunicaciones",
            "Servicios",
            [
              {
                title: "Servicios",
                rows: [
                  { id: "CANTV", title: "CANTV" },
                  { id: "MOVISTAR_PREPAY", title: "MOVISTAR PREPAGO" }
                ],
              },
            ],
            "Pago de servicios"
          );
        controllerMessage.sendMessage(from, productsList);
    }
    if(end.find(x => x === body.towerCase())){
        sendMessage(from, "Gracias por usar el bot de Paguetodo C.A, hasta luego!");
    }
    saveHistory(from, body);
}

module.exports = controllerMessage;