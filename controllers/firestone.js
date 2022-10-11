const db = require('../config/connect');
const query = {};

query.getUser = async (collection, phone) => {
    let data = null
    const doc = db.collection(collection).where('phone', "==", phone);
    const users = await doc.get();
    users.forEach(x => data = x.data())
    return data;
}

module.exports = query;