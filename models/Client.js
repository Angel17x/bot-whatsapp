const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Client = new Schema({
    name: String,
    number: {
        type: String,
        required: true
    },
    message: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Client', Client);