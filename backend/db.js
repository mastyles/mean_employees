const mongoose = require('mongoose');

let uri = 'mongodb://127.0.0.1:27017/employees_db';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB using MongoDB Compass!');
});

module.exports = mongoose;