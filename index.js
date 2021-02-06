const express = require('express');
const app = express();

const port = process.env.PORT;
app.listen(port, () => { console.log(`port: ${port}`) });

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.get('/', () => {
    client.query('SELECT * FROM mb;', (err, res) => {
        console.log(JSON.stringify(res));
        res.send("hello");
        // client.end();
    });
});




