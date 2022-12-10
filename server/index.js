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
    console.log("currentTutor " + currentTutor);

    console.log("req = " + req);
    const sqlGet = "SELECT * FROM Session WHERE tutorId = ?";
    db.query(sqlGet, [currentTutor], (err, result) => {
        res.send(result);
    });
});

/* Query sessions for the subject */
app.get("/api/sessionSelection", (req, res) => {
    const currentSubject = req.query.selectedSubject;
    console.log(currentSubject);

    const sqlSelect = 
        "SELECT * FROM Session WHERE subjectId = ?"
        /*"JOIN Tutor ON Session.tutorId = Tutor.id"*/
    db.query(sqlSelect, [currentSubject], (err, result) => {
        res.send(result);
    });
});

/* Update student on the session that they select */
/*app.put("/api/selectSession", (req, res) => {
    const sessionId = req.body.id
    const selectedSession = req.body.sessionId

    console.log("Subject Id is : " + selectedSession)
    console.log("Session Id is : " + sessionId)
});*/

app.put('/api/selectSession', (req, res) => {
    // Get the data for the session to update from the request body
    const id = req.body.id;
    const studentId = req.body.studentId;
  
    // Construct the MySQL UPDATE statement
    const sql = `UPDATE Session SET studentId = ? WHERE Session.id = ?`;
    const values = [studentId, id];

    // Log the sql and values variables
    console.log(sql, values);
  
    // Execute the UPDATE statement
    db.query(sql, values, (error, result) => {
      if (error) {
        // If an error occurred, return an error response
        return res.status(500).json({
          error: error.message
        });
      }
      // Otherwise, return a success message
      res.json({
        message: 'Session updated successfully'
      });
    });
  });

/* Querying all rooms from Room Table */
app.get("/api/room", (req, res) => {
    const sqlSelect = "SELECT * FROM Room;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

/* Insert new subject and new session from Add New Page */
app.post("/api/addNew", (req, res) => {
    console.log("before inserting new session");
    const tutorId = req.body.tutorId;
    // studentId is NULL
    const studentId = "hi";
    const subject = req.body.subject;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const room = req.body.roomNo;
    console.log(tutorId);
    console.log(subject);
    console.log(startTime);
    console.log(endTime);
    console.log(room);
    const sqlInsert = "INSERT INTO Session (tutorId, studentId, startTime, endTime, room, subjectId) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsert, [tutorId, studentId, startTime, endTime, room, subject], (err, result) => {
        console.log(result);
    });
});

app.delete("/api/deleteSession", (req, res) => {
    const session = req.body.id;
    const sqlDelete = "DELETE FROM Session WHERE id = ?";
    db.query(sqlDelete, [session], (err, result) => {
        console.log(result);
    });
});


app.post("/api/insert", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const classStanding = req.body.classStanding;
    const role = req.body.role;

    /* Determine if user signing up is a student or tutor */
    if (role == "student") {
        const sqlInsert = "INSERT INTO Student (firstName, lastName, classStanding, email, password) VALUES (?,?,?,?,?);"
        db.query(sqlInsert, [firstName, lastName, classStanding, emailAddress, password], (err, result) => {
            console.log(result);
        });
    } else if (role == "tutor") {
        const sqlInsert = "INSERT INTO Tutor (password, firstName, lastName, classStanding, email) VALUES (?,?,?,?,?);"
        db.query(sqlInsert, [password, firstName, lastName, classStanding, emailAddress], (err, result) => {
            console.log(result);
        });
    }
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