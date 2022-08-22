// const exceljs = require('exceljs');
// const moment = require('moment');
// const fs = require('fs');
const ora = require('ora');
const chalk  = require('chalk');
const Client = require('../models/Client');

const saveHistory = async (number, message) => {
    if(getCLient(number)){
        updateClient({number, message})
    }else{
        addClient(number, message)
    }
    
    // const pathChat = `./chats/${number}.xlsx`;
    // const workbook = new exceljs.Workbook();
    // const today = moment().format('DD-MM-YYYY hh:mm');
    // if(fs.existsSync(pathChat)){
    //     workbook.xlsx.readFile(pathChat)
    //     .then(() => {

    //         const worksheet = workbook.getWorksheet(1);
    //         const lastRow = worksheet.lastRow;
    //         let getRowInsert = worksheet.getRow(++(lastRow.number));
    //         getRowInsert.getCell('A').value = today;
    //         getRowInsert.getCell('B').value = message;
    //         getRowInsert.commit();
    //         workbook.xlsx.writeFile(pathChat)
    //         .then(() => {
    //             spinner.stop()
    //             console.log(chalk.green(`Fila agregada al excel del número ${number}`))
    //         })
    //         .catch((err) => {
    //             spinner.stop()
    //             console.log(chalk.red(`Ah ocurrido un error al guardar el nuevo mensaje ${err?.message}`))
    //         })
    //     })
    // }else{
    //     const spinner = ora(`${chalk.yellow('Generando excel')}`).start();

    //     const worksheet = workbook.addWorksheet('chats');
    //     worksheet.columns = [
    //         {header: "Fecha", key: 'date'},
    //         {header: "Mensaje", key: 'message'}
    //     ];
    //     worksheet.addRow([today, message]);
    //     workbook.xlsx.writeFile(pathChat)
    //     .then(() => {
    //         spinner.stop()
    //         console.log(chalk.green('Nueva conversación creada'))
    //     }).catch((err) => {
    //         console.log(`algo falló => ${err?.message}`);
    //     })
    // }

}
const getCLient = (number) => {
    const client = Client.findOne({number})
    return client
}
const addClient = async (number, message) => {
    const spinner = ora(`${chalk.yellow(`Agregando nuevo cliente`)}`).start();
    const person = new Client({number, message: [message]});
    try {
        await person.save();
        spinner.stop()
        console.log(chalk.green('Cliente agregado con éxito'));
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err?.message));
    }
    return person.save();
}
const updateClient = async (args) => {
    const person = await Client.findOne({number: args.number})
            if(!person) return console.log(chalk.red('No se encuentra el cliente para actualizar!'));
            person.message.push(args.message);
            try{
                await person.save();
                console.log(chalk.green(`Agregando mensaje al cliente ${args.number}`));
            }catch(err){
                console.log(chalk.red(err?.message));
            }
            return person.save()
}
module.exports = saveHistory