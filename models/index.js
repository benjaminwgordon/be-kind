// modules
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/be-kind';

// constants
const DB_CONNECTED_MSG = `Connected to the Be-Kind database at ${connectionString}`;
const DB_DISCONNECTED_MSG = `Disconnected from the Be-Kind database at ${connectionString}`;
const DB_ERROR_MSG = `Error connectiong to the Be-Kind database at ${connectionString}`;

// connections and feedback
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(DB_CONNECTED_MSG);
}).catch((err) => {
    console.log(DB_ERROR_MSG);
});

mongoose.connection.on('disconnected', () => {
    console.log(DB_DISCONNECTED_MSG);
});

// exports
module.exports = {
    User: require('./User'),
    Message: require('./Message'),
    Nudge: require('./Nudge'),
    Job: require('./Job')
}