//MODULES
const client = require('./controllers/init_client');
const { messages } = require('./controllers/messages');
const generateQr = require('./config/generate_qr');
const authFailure = require('./controllers/auth_failure');

//ACCESS CONFIG TO .env
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

client.on('qr', qr => generateQr(qr));
client.on('ready', () => console.log('client ready!'));
client.on("message", msg => messages(msg));
client.on('auth_failure', () => authFailure());

client.initialize();
