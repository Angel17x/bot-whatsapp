//MODULES
const client = require('./controllers/init_client');
const { messages } = require('./controllers/messages');
const generateQr = require('./config/generate_qr');
const authFailure = require('./controllers/auth_failure');
const connect = require('./config/connect');
const ora = require('ora');
const chalk  = require('chalk');

const spinner = ora(`${chalk.yellow('Inicializando cliente')}`).start();
let spinnerQr
let spinnerMONGO

client.on('qr', qr => {
    spinner.stop()
    generateQr(qr)
    console.log(chalk.green('QR Generado'))
    spinnerQr = ora(`${chalk.yellow('Esperando autenticación')}`).start();
});
client.on('ready', () => {
    spinnerMONGO = ora(`${chalk.yellow('Esperando autenticación')}`).start();
    connect().then(() => {
        spinnerMONGO.stop()
        console.log(chalk.green("Conexion con mongodb ah sido éxito "))
    }).catch(err => {
        spinnerMONGO.stop()
        console.log(chalk.red(`Error al conectar con mongodb => ${err?.message}`))
    })
    spinner.stop()
    console.log(chalk.blue("Autor: Angel Lugo"))
    console.log(chalk.blue(`Github: ${chalk.blue.underline.bold('https://github.com/Angel17x')}`))
    console.log(chalk.green("Cliente inicializado con éxito "))
});
client.on('authenticated', () => {
    console.clear();
    if(spinnerQr!=null || spinnerQr!=undefined){
        spinnerQr.stop();
    }
})
client.on("message", msg => messages(msg));
client.on('auth_failure', () => authFailure());

client.initialize();
