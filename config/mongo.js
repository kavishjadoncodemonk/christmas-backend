const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcru8fc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = client;