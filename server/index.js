const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: '35.202.200.76',
    user: 'root',
    password: 'ZzLDQJgh93WcUk9yqbBgmSfSYspzyA',
    database: 'BoilerTutor' 
});

/*app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO Student (firstName, lastName, classStanding, emailAddress, password) VALUES ('Harry', 'Potter', 'Grad Student', 'harry@email.com', watermelonSugar);"
    db.query(sqlInsert, (err, result) => {
        res.send("hello worldz");
    })
    res.send("hello");
});*/

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM Student;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const classStanding = req.body.classStanding;
    
    const sqlInsert = "INSERT INTO Student (firstName, lastName, classStanding, email, password) VALUES (?,?,?,?,?);"
    db.query(sqlInsert, [firstName, lastName, classStanding, emailAddress, password], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});