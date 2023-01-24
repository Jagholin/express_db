import pg from "pg";

console.log("connect string: ", process.env.CONNECTION_STRING);

const connection = new pg.Pool({
    connectionString: process.env.CONNECTION_STRING
});

export default connection;
