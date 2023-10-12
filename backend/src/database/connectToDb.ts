const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb+srv://ar3aepitech:aaaaaaaaaaaaaaaaaa@area.l8hemky.mongodb.net/";
const Client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await Client.connect();
    } catch (e) {
        console.error(e);
    } 
}

export { connectToDatabase, Client};