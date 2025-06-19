require('dotenv').config()
const uri=process.env.URI
const{MongoClient}=require("mongodb")
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client.db("mytodo"); 
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = { connectDB, client };