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
        const data = JSON.stringify(res);
        res.send(data);
        
        // client.end();
    });
});




