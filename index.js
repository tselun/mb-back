// author: stephen chiu
// date: feb 5, 2021
// about: backend of message board

const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const port = process.env.PORT;
app.listen(port, () => {console.log(`port: ${port}`)});

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

// main interface
app.get('/', (req, res) => { 
    res.sendFile('index.html', {root: __dirname })
})

// get all messages
app.get('/get', (req, res) => {
    client.query('SELECT * FROM mb;', (err, ret) => {
        let str = JSON.stringify(ret);
        res.send(str);
    });
});

// add new message
app.post('/add', (req, res) => {
    let { name, msg } = req.body;
    client.query('INSERT INTO mb(name, msg) VALUES($1, $2)', [name, msg], (err, ret) => { 
        if (err) console.log(err);
        else res.send('new message added');
    });
})



