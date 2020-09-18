const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/be-kind';
const DB_CONNECTED_MSG = `Connected to the Be-Kind database at ${connectionString}`;
const DB_DISCONNECTED_MSG = `Disconnected from the Be-Kind database at ${connectionString}`;
const DB_ERROR_MSG = `Error connectiong to the Be-Kind database at ${connectionString}`;




mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});




mongoose.connection.on('connected', () => {
    console.log(DB_CONNECTED_MSG);
});

mongoose.connection.on('error', (err) => {
    console.log(DB_DISCONNECTED_MSG + ':\n' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log(DB_ERROR_MSG);
});




module.exports = {
    User: require('./User'),
    Message: require('./Message'),
    Nudge: require('./Nudge')
}