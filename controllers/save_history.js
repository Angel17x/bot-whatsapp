const ora = require('ora');
const chalk  = require('chalk');
const Client = require('../models/Client');

const saveHistory = async (number, message) => {
    if(getCLient(number)){
        // updateClient({number, message});
    }else{
        // addClient(number, message);
    }
}
const getCLient = (number) => {
    // const client = Client.findOne({number});
    // return client;
}
const addClient = async (number, message) => {
    // const spinner = ora(`${chalk.yellow(`Agregando nuevo cliente`)}`).start();
    // const person = new Client({number, message: [message]});
    // try {
    //     await person.save();
    //     spinner.stop();
    //     console.log(chalk.green('Cliente agregado con éxito'));
    // } catch (err) {
    //     spinner.stop();
    //     console.log(chalk.red(err?.message));
    // }
    // return person.save();
}
const updateClient = async (args) => {
    // const person = await Client.findOne({number: args.number});
    // if(!person) return console.log(chalk.red('No se encuentra el cliente para actualizar!'));
    // person.message.push(args.message);
    // try{
    //     await person.save();
    //     console.log(chalk.green(`Agregando mensaje al cliente ${args.number}`));
    // }catch(err){
    //     console.log(chalk.red(err?.message));
    // }
    // return person.save();
}
module.exports = saveHistory