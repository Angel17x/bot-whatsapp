const qrcode = require('qrcode-terminal')
const generateQr = qr => {
    console.log("generando qr")
    qrcode.generate(qr, {small: true});
}
module.exports = generateQr