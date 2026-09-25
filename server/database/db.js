import { Pool } from 'pg';

// const database = new Client ({
//     user: process.env.SUPA_USER,
//     host: process.env.SUPA_HOST,
//     database: process.env.SUPA_NAME,
//     password: process.env.SUPA_PASSWORD,
//     port: process.env.SUPA_PORT,
//     ssl: {
//         rejectUnauthorized : false
//     }
// });

const database = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    }
})
try {
    await database.connect();
    console.log("Connected to the supabase postgres successfully");
}

catch(error){
    console.log("database connection failed",error);
    process.exit(1);
}

export default database;