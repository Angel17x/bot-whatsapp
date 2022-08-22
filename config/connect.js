const { config } = require('dotenv'); 
const mongoose = require('mongoose');

config()

module.exports = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useFindAndModify: false,
        // useCreateIndex: true
    })
}