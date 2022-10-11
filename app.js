//MODULES
const client = require('./controllers/init_client');
const { messages } = require('./controllers/messages');
const generateQr = require('./config/generate_qr');
const authFailure = require('./controllers/auth_failure');
const ora = require('ora');
const { getUser } = require('./controllers/firestone');
const chalk  = require('chalk');
const express = require("express");
const router = require('./routes/qr');
const path = require('path');
const runSample = require('./controllers/dialogflow');
const { run, send } = require('./controllers/dialogflow');

// async function d_intent(msg) {
//     let add = run();
//     let session = await add;
//     const { path, client } = session;
//     let response = await send({path, client, msg});
//     console.log(response)
// }

// d_intent("hola");

const app = express();
const spinner = ora(`${chalk.yellow('Inicializando cliente')}`).start();
let spinnerQr;

//SETTINGS
app.set("port", process.env.port || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

//ROUTES
app.use('/qr', router);
// app.use('/webhook', webhook);

client.on('qr', qr => {
    spinner.stop()
    generateQr(qr)
    console.log(chalk.green('QR Generado'))
    spinnerQr = ora(`${chalk.yellow('Esperando autenticación')}`).start();
});
client.on('ready', () => {
    spinner.stop();
    console.log(chalk.blue("Autor: Angel Lugo"));
    console.log(chalk.blue(`Github: ${chalk.blue.underline.bold('https://github.com/Angel17x')}`));
    console.log(chalk.green("Cliente inicializado con éxito "));
});
client.on('authenticated', () => {
    console.clear();
    if(spinnerQr!=null || spinnerQr!=undefined){
        spinnerQr.stop();
    }
});
client.on("message", msg => messages(msg));
client.on('auth_failure', () => authFailure());


app.listen(app.get('port'), () => `server running on port ${app.get("port")}`)
client.initialize();
