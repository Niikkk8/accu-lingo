import { DataAPIClient } from "@datastax/astra-db-ts";

const client = new DataAPIClient(process.env.CONNECTION_STRING);
const db = client.db('https://14cff81f-199c-4377-9244-51ebbe081081-us-east-2.apps.astra.datastax.com');

export { db };