const dotenv = require('dotenv');
const { DataAPIClient } = require("@datastax/astra-db-ts");

// Load environment variables from .env file
dotenv.config();

// Initialize the client
const client = new DataAPIClient(process.env.CONNECTION_STRING);
const db = client.db('https://14cff81f-199c-4377-9244-51ebbe081081-us-east-2.apps.astra.datastax.com');

export { db };