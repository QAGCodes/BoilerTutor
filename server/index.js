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
  const sqlGet = "Select * from Session where studentId = ?";
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
  const sqlSelect = "SELECT * FROM Subject;";
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

/* Query sessions for the subject */
app.get("/api/sessionSelection", (req, res) => {
  const currentSubject = req.query.selectedSubject;
  console.log(currentSubject);

  const sqlSelect = "SELECT * FROM Session WHERE subjectId = ?";
  /*"JOIN Tutor ON Session.tutorId = Tutor.id"*/
  db.query(sqlSelect, [currentSubject], (err, result) => {
    res.send(result);
  });
});

/* Querying all rooms from Room Table */
app.get("/api/room", (req, res) => {
  const sqlSelect = "SELECT * FROM Room;";
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
