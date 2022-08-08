const exceljs = require('exceljs');
const moment = require('moment');
const fs = require('fs');

const saveHistory = (number, message) => {
    const pathChat = `./chats/${number}.xlsx`;
    const workbook = new exceljs.Workbook();
    const today = moment().format('DD-MM-YYYY hh:mm');
    if(fs.existsSync(pathChat)){
        workbook.xlsx.readFile(pathChat)
        .then(() => {
            const worksheet = workbook.getWorksheet(1);
            const lastRow = worksheet.lastRow;
            let getRowInsert = worksheet.getRow(++(lastRow.number));
            getRowInsert.getCell('A').value = today;
            getRowInsert.getCell('B').value = message;
            getRowInsert.commit();
            workbook.xlsx.writeFile(pathChat)
            .then(() => {
                console.log('Agregando nuevo mensaje al archivo');
            })
            .catch((err) => {
                console.log(`Ah ocurrido un error al guardar el nuevo mensaje ${err?.message}`)
            })
        })
    }else{
        const worksheet = workbook.addWorksheet('chats');
        worksheet.columns = [
            {header: "Fecha", key: 'date'},
            {header: "Mensaje", key: 'message'}
        ];
        worksheet.addRow([today, message]);
        workbook.xlsx.writeFile(pathChat)
        .then(() => {
            console.log('conversación creada');
        }).catch((err) => {
            console.log(`algo falló => ${err?.message}`);
        })
    }

}

module.exports = saveHistory