const mongoose = require('mongoose');
mongoose.connect('mongodb://Triono:triono101@localhost:27017/triono-mongoose?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Server database terhubung'));
