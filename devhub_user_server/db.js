const { MongoClient } = require('mongodb');
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const mongoServiceHosts = 'mongodb-0.mongodb:27017,mongodb-1.mongodb:27017,mongodb-2.mongodb:27017';
const url = process.env.NODE_ENV === 'production'
  ? `mongodb://${username}:${password}@${mongoServiceHosts}/?replicaSet=rs0&readPreference=secondary`
  : 'mongodb://127.0.0.1:27017';
const dbName = 'devHubDatabase'; 

let db;
let client;

const connectDB = async () => {
  if (!db) {
    console.log(url);
    client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
  }
  return db;
};

const disconnectDB = async () => {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
    db = null; 
    client = null; 
  }
};

module.exports = { connectDB, disconnectDB };

