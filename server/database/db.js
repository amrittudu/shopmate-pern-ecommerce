import pkg from 'pg';
import { createUserTable } from '../models/userTable.js';
const { Client } = pkg;

const database = new Client ({
    user: "postgres",
    host: "localhost",
    database: "mern_ecommerce",
    password: "12345",
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