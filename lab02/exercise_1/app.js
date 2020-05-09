const mysql = require('mysql2/promise');
require('dotenv').config({
    path: '../.env'
});

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATA_BASE
    });

    const[rows] = await connection.query('select * from lab2_users');
    console.log('Users:', rows);
}

main()
    .catch(err => console.log(err));
