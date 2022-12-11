import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { StyledEngineProvider } from "@mui/material/styles";
import UpcomingSessions from "../Components/upcomingSessions";

//TODO: sidebar addition is needed
function Home() {
  /* Holds all user's data from the Student/Tutor table + role */
  const currUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log("Hi there", currUser);
    Axios.get("http://localhost:3001/api/getUserSession", {
      params: {
        id: currUser.id,
        role: currUser.role,
      },
    }).then((result) => {
      setSessions(result.data);
      console.log(result);
    });

    Axios.get("http://localhost:3001/api/room").then((result) => {
      setRooms(result.data);
      console.log(result);
    });

    Axios.get("http://localhost:3001/api/subject").then((result) => {
      setSubjects(result.data);
      console.log(result);
    });

    Axios.get("http://localhost:3001/api/tutor").then((result) => {
      setTutors(result.data);
      console.log(result);
    });

    Axios.get("http://localhost:3001/api/get").then((result) => {
      setStudents(result.data);
      console.log(result);
    });
  }, []);

  const requestNewClick = (event) => {
    navigate("/subjectSelectionStudent");
  };

  const editAvailabilityClick = (event) => {
    navigate("/editAvailability");
  };

  console.log(sessions, rooms, subjects, tutors);
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="lg">
        <Stack spacing={5} sx={{ margin: 5 }}>
          <Card>
            <Grid container spacing={54} alignItems="center">
              <Grid item xs={7} pt={10}>
                <h1
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "#686516",
                    marginTop: "4%",
                    marginBottom: "4%",
                  }}
                >
                  My Upcoming Sessions
                </h1>
              </Grid>
              <Grid item xs={4} pt={10}>
                {currUser.role == "Tutor" ? (
                  <Button
                    variant="contained"
                    style={{
                      width: 150,
                      height: 50,
                      backgroundColor: "#505e50",
                      textTransform: "none",
                      fontFamily: "Fira Sans",
                      fontSize: 15,
                    }}
                    onClick={editAvailabilityClick}
                  >
                    Edit Availability
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      width: 150,
                      height: 50,
                      backgroundColor: "#505e50",
                      textTransform: "none",
                      fontFamily: "Fira Sans",
                      fontSize: 15,
                    }}
                    onClick={requestNewClick}
                  >
                    Request New
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        </Stack>

        {sessions != [] &&
          sessions.map((session) => {
            let roomNo;
            let tutorName;
            let studentName
            let subjectName;

            rooms.forEach((room) => {
              if (room.id == session.id) {
                roomNo = room.roomNo;
              }
            });

            if (currUser.role == "Student") {
              tutors.forEach((tutor) => {
                if (tutor.id == session.tutorId) {
                  tutorName = tutor.firstName + " " + tutor.lastName;
                }
              });
            } else {
              students.forEach((student) => {
                if (student.id == session.studentId) {
                  studentName = student.firstName + " " + student.lastName;
                }
              });
            }

            subjects.forEach((subject) => {
              if (subject.id == session.subjectId) {
                subjectName = subject.name;
              }
            });

            session["roomNo"] = roomNo;
            currUser.role == "Tutor" ? session["tutorName"] = tutorName : session["studentName"] = studentName
            session["subjectName"] = subjectName;

            return (
              <UpcomingSessions
                session={session}
                key={session.id}
                role={currUser.role}
              ></UpcomingSessions>
            );
          })}
      </Container>
    </StyledEngineProvider>
  );
}

export default Home;
