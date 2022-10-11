const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const account = require(`../${process.env.ACCOUNT_FILE_NAME}`);
initializeApp({
    credential: cert(account)
});
const db = getFirestore();

module.exports = db;

