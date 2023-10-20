import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch(e) {
  console.error(e);
}


const dbName = "Trust" 
let db = conn.db(dbName);

// Check if the database exists
const dbList = await client.db().admin().listDatabases();
const dbExists = dbList.databases.some(db => db.name === dbName);
if (!dbExists) {
    console.error("Database does not exist");
}

export default db;