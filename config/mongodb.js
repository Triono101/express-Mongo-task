const {MongoClient} = require('mongodb');
const url = 'mongodb://Triono:triono101@localhost:27017?authSource=admin';
const client = new MongoClient(url);

(async() => {
    try{
        await client.connect();
        console.log('koneksi ke mongodb berhasil');
    }catch(e) {
        console.log(e);
    }
})();

const db = client.db('triono-native');

module.exports = db;