const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://hafilmuz:Muz%402007@fees.snentyd.mongodb.net/'; // MongoDB connection string
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('Fees'); // Replace with your actual database name
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};

module.exports = { connectDB, getDB };
