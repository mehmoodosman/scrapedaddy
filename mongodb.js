require('dotenv').config();

const { MongoClient } = require("mongodb");

//MongoDB connection string
const uri = "mongodb+srv://umamashahzad2004:TMxcNQel7XNGsrGG@scrapped-info.wfu20.mongodb.net/?retryWrites=true&w=majority&appName=Scrapped-Info";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

let client   
let clientPromise

if(!uri) {
    throw new Error('Please add your Mongo URI to .env.local file')
}

if(process.env.NODE_ENV === 'development') {
    if(!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
}
else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

module.exports = clientPromise;