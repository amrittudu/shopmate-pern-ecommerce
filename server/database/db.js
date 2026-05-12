import pkg from 'pg';
import { createUserTable } from '../models/userTable.js';
const { Client } = pkg;

const database = new Client ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

try {
    await database.connect();
    console.log("Connected to the database successfully");
}

catch(error){
    console.log("database connection failed",error);
    process.exit(1);
}

export default database;