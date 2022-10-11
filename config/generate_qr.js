const qrcode = require('qrcode-terminal');
const generateQr = qr => {
    qrcode.generate(qr, {small: true});
}
module.exports = generateQr