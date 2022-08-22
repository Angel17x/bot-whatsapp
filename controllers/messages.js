const controllerMessage = {};
const saveHistory = require('./save_history');
const client = require('./init_client');
const { MessageMedia, List } = require('whatsapp-web.js');
const services = require('../config/services');
const chalk = require('chalk');

controllerMessage.sendMessage = (to, message) => {
    client.sendMessage(to, message)
}
controllerMessage.sendMedia = async (to, file) => {
    const media = MessageMedia.fromFilePath(`./images/${file}`)
    await client.sendMessage(to, media);
}
controllerMessage.messages = async (msg) => {
    
    const { from, to, body, type } = msg;

    console.log(from, to, body, type);
    
    let init = ["Hola", "hola", "hola, como estas?", "hola, cómo estás?", "como estas?"];
    let end = ["gracias", "adios", "hasta luego", "Adios", "Adiós", "Gracias", "Hasta luego"];
    if(init.find(x => x === body)){
        await controllerMessage.sendMedia(from, 'logo-paguetodo.png');
        controllerMessage.sendMessage(from, "Hola bienvenido al bot 🤖 de pago de servicios de Paguetodo C.A. por favor seleccione de la lista uno de los servicios que a continuación se le desplegará en pantalla");
        
        const lista = await controllerMessage.list();
        
        if(lista!=null || lista!=undefined) {
          if(lista.length!=0){
            controllerMessage.sendMessage(from, lista);
          }else{
            controllerMessage.sendMessage(from, 'No hay servicios para procesar esta solicitud!');
          }
        }else{
          controllerMessage.sendMessage(from, 'No hay servicios para procesar esta solicitud!');
        }
    }
    if(end.find(x => x === body)){
        sendMessage(from, "Gracias por usar el bot de Paguetodo C.A, hasta luego!");
    }
    if(type === "list_response"){
      const listaSeleccion = await services();
      if(listaSeleccion!=null || listaSeleccion!=undefined){
        if(listaSeleccion.length!=0){
          if(listaSeleccion.find(x => x.name === body)){
            console.log(`El usuario ah seleccionado el servicio ${body}`)
            controllerMessage.sendMessage(from, `Ah seleccionado el servicio ${body}`);
            controllerMessage.sendMessage(from, 'Por favor ingrese su nombre');
          }
        }
        
      }
        
    }
    saveHistory(from, body);
}

controllerMessage.list = async () => {
  const data = await services();
  
  if(data == undefined || data == null) {
    return null
  }
  if(data.length==0){
    return null
  }

  const list = data.map(x => ({id: x.id, title: x.name}));
  
  try{
    return new List(
      "Telecomunicaciones",
      "Servicios",
      [
        {
          title: "Servicios",
          rows: list,
        },
      ],
      "Servicios"
    );
    
  }catch(err){
    console.log(err?.message);
  }
  
}
module.exports = controllerMessage;