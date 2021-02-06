const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL
})

client.connect((err)=>{
    client.query('CREATE TABLE codebit(id SERIAL PRIMARY KEY, n VARCHAR(50) NOT NULL, d VARCHAR(500) NOT NULL);', ()=> console.log('create'));
    client.query("DELETE FROM codebit;", ()=>console.log('delete'));
    client.query("INSERT INTO codebit (n,d) VALUES ('mini-putt','calculated the location of the golf ball on a 2d map after time t (given a set of initial conditions). using Matlab ODE45 solver and a root finding algorithm');", ()=>console.log('insert 316'));
    client.query("INSERT INTO codebit (n,d) VALUES ('accelerometer','performed statistical analysis (t-test, anova, and linear regression) and data cleaning (butterworth filter) on accelerometer data (iphone) using pythons scipy and sklearn libraries, to answer the question: if there is a difference between the walking pace of people?');", ()=>console.log('insert 353'));
    client.query("INSERT INTO codebit (n,d) VALUES ('facial-detection','used 2500+ images to train a five layer convolutional neural network (cnn) so it can detect a person in an unused image with ~92% accuracy.');", ()=>console.log('insert 353'));
});

app.get('/:id', (req,res) => {
    path = 'download/' + req.params.id + '.zip';
    res.download(path);
});

function home(text){
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <title>codebit</title>
        </head>
        <body>
            <br>
            <div class="row text-center"> 
                <div class="col-sm-12">
                    <h5>welcome to codebit:</h5>
                </div>
            </div>
            <div class="row text-center"> 
                <div class="col-sm-12">
                    <h6>a simple code repo.</h6>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-sm-12"><h6>${text}</h6></div>
            </div>
        </body>
        </html>
    `;
}

app.get("/", (req,res) => {
    client.query("SELECT * FROM codebit", (err,ret) => {
        if(err) console.log(err);
        text = "<table class='table'>";
        text += "<thead class='thead-dark'>";
        text += "<tr>";
        text += "<th>project</th>";
        text += "<th>description</th>";
        text += "<th>code</th>";
        text += "</tr>";
        text += "</thead>";
        text += "<tbody>";
        for(var i=0; i<ret.rows.length; i++){
            text += "<tr>";
            text += "<td>"+ret.rows[i].n+"</td>";
            text += "<td>"+ret.rows[i].d+"</td>";
            url = "https://codebit.herokuapp.com/" + ret.rows[i].n;
            text += "<td><a href="+url+" class='btn btn-dark'>download</a></td>";
            text += "</tr>";
        }
        text += '</tbody>';
        text += '</table>';
        res.send(home(text));
    });
});

app.listen(port, () => {
    console.log("listening..");
});