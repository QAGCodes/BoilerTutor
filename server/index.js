const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM Student;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

/* Querying all data from Subject Table */
app.get("/api/subject", (req, res) => {
    const sqlSelect = "SELECT * FROM Subject;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

/* Query sessions based on tutor id */
app.get("/api/availableSessions", (req, res) => {
    const currentTutor = req.query.tutorId;
    console.log(currentTutor);

    console.log("req = " + req);
    const sqlGet = "SELECT * FROM Session WHERE tutorId = ?";
    db.query(sqlGet, [currentTutor], (err, result) => {
        res.send(result);
    });
});

/* TO DO: Query sessions for the subject */
/*
app.get("/api/subjectName", (req, res) => {
    console.log("req = " + req);
    const sqlSelect = "SELECT name FROM Subject WHERE id = " + req.body.id;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
*/

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

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});