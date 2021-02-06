const app = require('express')();
const port = process.env.PORT;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.listen(port, () => { console.log(`port: ${port}`) });

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.get('/', (req, res) => { 
    res.sendFile('index.html', {root: __dirname })
})

app.get('/get', (req, res) => {
    client.query('SELECT * FROM mb;', (err, ret) => {
        let str = JSON.stringify(ret);
        res.send(str);
    });
});

app.post('/add', (req, res) => {
    let { name, msg } = req.body;
    client.query('INSERT INTO mb(name, msg) VALUES($1, $2)', [name, msg], (err, ret) => { 
        if (err) console.log(err);
        else res.send('new message added');
    });
})



