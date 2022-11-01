const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require("cors")

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'testdb'
})

app.post('/test', (req, res) => {
    //console.log(req.body)

    const tutor = req.body.tutor;
    const subject = req.body.subject;

    db.query('INSERT INTO tutor (name, subject) VALUES (?, ?)', 
    [tutor, subject],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted successfully")
        }
    }
    );
});

app.get("/", (req, res) => {
    res.send("hello world")
});

app.listen(3001, () => {
    console.log("Server initialized on port 3001");
});