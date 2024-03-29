const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: "35.202.200.76",
  user: "root",
  password: "ZzLDQJgh93WcUk9yqbBgmSfSYspzyA",
  database: "BoilerTutor",
});

/* READ UNCOMMITED */
const dbReadUncommited = mysql.createConnection({
  host: "35.202.200.76",
  user: "root",
  password: "ZzLDQJgh93WcUk9yqbBgmSfSYspzyA",
  database: "BoilerTutor",
  isolationLevel: "READ UNCOMMITED" 
});

/* REPEATABLE READ */
const dbRepeatableRead = mysql.createConnection({
  host: "35.202.200.76",
  user: "root",
  password: "ZzLDQJgh93WcUk9yqbBgmSfSYspzyA",
  database: "BoilerTutor",
  isolationLevel: "REPEATABLE READ" 
});

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../client/build")));

/* Get user info + role (Student/Tutor) */

app.get("/api/auth", (req, res) => {
  const currEmail = req.query.email;
  const CurrPassword = req.query.password;
  console.log(currEmail, CurrPassword);
  console.log(req.query);

  const sqlGet =
    "Select * from (SELECT *, 'Student' as role FROM Student union select *, 'Tutor' as role from Tutor) as users where email = ? and password = ?";
  db.query(sqlGet, [currEmail, CurrPassword], (err, result) => {
    res.send(result);
  });
});

/* get a specific student's sessions */
app.get("/api/getUserSession", (req, res) => {


  const sqlGet = req.query.role == "Student" ? "Select * from Session where studentId = ?" : "Select * from Session where tutorId = ?";
  db.query(sqlGet, [req.query.id], (err, result) => {
    res.send(result);
  })
});

// /* get a specific room's record */
// app.get("/api/getRoom", (req, res) => {
//   const sqlGet = "Select * from Room where id = ?";
//   db.query(sqlGet, [req.query.id], (err, result) => {
//     res.send(result);
//   })
// });

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Student;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

/* Querying all data from Subject Table */
app.get("/api/subject", (req, res) => {
    const sqlSelect = "SELECT * FROM Subject ORDER BY Subject.name;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

/* Querying all data from Subject Table */
app.get("/api/tutor", (req, res) => {
  const sqlSelect = "SELECT * FROM Tutor;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

/* Get a list of all subjects (Stored Procedure) */
app.get("/api/getSubjects", (req, res) => {
    const sqlGet = 
        "CALL getSubjects()"
    db.query(sqlGet, (err, result) => {
        if (result[0] != undefined) {
            res.send(result[0]);
        }
    });
});


/* Query sessions based on tutor id */
app.get("/api/availableSessions", (req, res) => {
    const currentTutor = req.query.tutorId;
    console.log("currentTutor " + currentTutor);

    console.log("req = " + req);
    const sqlGet = "SELECT Session.id AS sessionId, Session.tutorId, Session.studentId, Session.startTime, Session.endTime, Session.room, Session.subjectId, Session.date, Subject.name AS subjectName, Room.roomNo AS roomNo FROM Session JOIN Subject ON Session.subjectId = Subject.id JOIN Tutor ON Tutor.id = Session.tutorId JOIN Room ON Session.room = Room.id WHERE Tutor.id = ?;"
    //const sqlGet = "SELECT * FROM Session WHERE tutorId = ?";
    dbReadUncommited.query(sqlGet, [currentTutor], (err, result) => {
        res.send(result);
    });
});

/* Query sessions for the subject */
app.get("/api/sessionSelection", (req, res) => {
    const currentSubject = req.query.selectedSubject;
    console.log(currentSubject);

    const sqlSelect = 
    "Select Session.id, Tutor.firstName AS tutorName, Session.studentId, Session.startTime, Session.endTime, Room.roomNo, Session.subjectId, Session.date FROM Session JOIN Tutor ON Tutor.id = Session.tutorId JOIN Room ON Room.id = Session.room WHERE subjectId = ? AND studentId IS NULL;"

    console.log(sqlSelect)

        /*"JOIN Tutor ON Session.tutorId = Tutor.id"*/
    dbRepeatableRead.query(sqlSelect, [currentSubject], (err, result) => {
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


/* Query for pastSessionsTutors w/ no specific subject (Stored Procedure) */
app.get("/api/tutorPastSessions", (req, res) => {
    const tutorId = req.query.tutorId;
    dbReadUncommited.query("CALL getTutorPastSessions(" + tutorId + ")", (err, result) => {
        res.send(result[0]);
    })
})

/* Query for pastSessionsTutors w/ a specific subject (Stored Procedure) */
app.get("/api/tutorSubjectPastSessions", (req, res) => {
    const tutorId = req.query.tutorId;
    const subjectId = req.query.subjectId;
    
    dbReadUncommited.query("CALL getTutorSubjectPastSessions(" + tutorId + "," + subjectId + ")", (err, result) => {
        res.send(result[0]);
    })
})

/* Query for pastSessionsStudents w/ no specific subject (Stored Procedure) */
app.get("/api/studentPastSessions", (req, res) => {
    const studentId = req.query.studentId;
    dbReadUncommited.query("CALL getStudentPastSessions(" + studentId + ")", (err, result) => {
        res.send(result[0]);
    })
})

/* Query for pastSessionsStudents w/ a specific subject (Stored Procedure) */
app.get("/api/studentSubjectPastSessions", (req, res) => {
    const studentId = req.query.studentId;
    const subjectId = req.query.subjectId;
    
    dbReadUncommited.query("CALL getStudentSubjectPastSessions(" + studentId + "," + subjectId + ")", (err, result) => {
        res.send(result[0]);
    })
})


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
    dbRepeatableRead.query(sql, values, (error, result) => {
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
    const sqlSelect = "SELECT * FROM Room ORDER BY Room.roomNo;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

/* Insert new subject and new session from Add New Page */
app.post("/api/addNew", (req, res) => {
    console.log("before inserting new session");
    const tutorId = req.body.tutorId;
    // studentId is NULL when session is first created
    const studentId = null;
    const subject = req.body.subject;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const room = req.body.roomNo;
    const date = req.body.date;
    console.log(tutorId);
    console.log(subject);
    console.log(startTime);
    console.log(endTime);
    console.log(room);
    const sqlInsert = "INSERT INTO Session (tutorId, studentId, startTime, endTime, room, subjectId, date) VALUES (?,?,?,?,?,?,?);"
    dbReadUncommited.query(sqlInsert, [tutorId, studentId, startTime, endTime, room, subject, date], (err, result) => {
        console.log(result);
    });
});

/* Delete specified session from Session table */
app.delete("/api/deleteSession", (req, res) => {
    const session = req.body.id;
    console.log(session)
    const sqlDelete = "DELETE FROM Session WHERE id = ?";
    dbReadUncommited.query(sqlDelete, [session], (err, result) => {
        console.log(result);
    });
});

app.put('/api/cancelSession', (req, res) => {
    // Get the data for the session to update from the request body
    const id = req.body.id;
  
    // Construct the MySQL UPDATE statement
    const sql = `UPDATE Session SET studentId = NULL WHERE Session.id = ?`;
    const values = [id];
  
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



app.post("/api/insert", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const classStanding = req.body.classStanding;
  const role = req.body.role;

  /* Determine if user signing up is a student or tutor */
  if (role == "student") {
    const sqlInsert =
      "INSERT INTO Student (firstName, lastName, classStanding, email, password) VALUES (?,?,?,?,?);";
    db.query(
      sqlInsert,
      [firstName, lastName, classStanding, emailAddress, password],
      (err, result) => {
        console.log(result);
      }
    );
  } else if (role == "tutor") {
    const sqlInsert =
      "INSERT INTO Tutor (password, firstName, lastName, classStanding, email) VALUES (?,?,?,?,?);";
    db.query(
      sqlInsert,
      [password, firstName, lastName, classStanding, emailAddress],
      (err, result) => {
        console.log(result);
      }
    );
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
