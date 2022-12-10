import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent } from "@mui/material";

function SessionSelectionStudent(props) {

  
  const currUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const loggedInStudent = currUser.id;

  const navigate = useNavigate();
  const location = useLocation();
  const currentSubject = location.state.Result; // all current subject information from subject selection page
  const [availableSessions, setAvailableSessions] = useState([])

  useEffect(() => {
      Axios.get('http://localhost:3001/api/sessionSelection', 
      {
        params: {
          selectedSubject: currentSubject.id
        }
      }).then((response) => {
        console.log(response.data)
        setAvailableSessions(response.data)
      })

  }, [])

  const selectSession = (sessionId) => {
    Axios.put('http://localhost:3001/api/selectSession', {
      id: sessionId,
      studentId: loggedInStudent
    }).then((response) => {
      console.log(response);
      //alert('successful');
    })

    //navigate("/homeStudent")
  }
    
  return (
    <>
    <Container maxWidth="xl" disableGutters="true">
    <Grid container direction="row" spacing={2} marginTop="5%">
        <Stack marginX="15%" width="100%" direction="row" spacing={69}>
          <h1
            style={{
              textAlign: "left",
              fontWeight: "normal",
              color: "#505e50",
            }}
          >
            {/* Change subject placeholder with chosen course */}
            Available Tutors and Timeslots for {currentSubject.name}
          </h1>
        </Stack>

        <Stack
          marginX="10%" width="80%" direction="column" 

        >
      
      {availableSessions.map((currentSession) => 
          <Card
            sx={{
              width: "60",
              height: "100%",
              bgcolor: "#F7FADD",
              borderRadius: "16px",
              boxShadow: 3,
              alignContent: "center",
              margin: 1,
            }}
          >
                <Stack
                      m={2}
                      direction={"row"}
                      justifyContent="space-between"
                      spacing={4}
                >
                  {/* Tutor Name */}
                  <Card
                    sx={{
                      boxShadow: "3",
                      borderRadius: "16px",
                      width: "60%",
                      height: "100%",
                    }}
                  >
                    Tutor
                    <CardActionArea
                      width="100%"
                      height="100%"
                    >
                      <CardContent width="100%" height="1000px">
                  
                        <Stack
                          margin="0"
                          direction="row"
                          width="100%"
                          height="100%"
                          justifyContent="space-evenly"
                        >
                          {currentSession.tutorName}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  {/* Time Slot */}
                  <Card
                    sx={{
                      boxShadow: "3",
                      borderRadius: "16px",
                      width: "60%",
                      height: "100%",

                    }}
                  >
                    Time
                    <CardActionArea
                      width="100%"
                      height="100%"
                    >
                      <CardContent width="100%" height="1000px">
                        <Stack
                          margin="0"
                          direction="row"
                          width="100%"
                          height="100%"
                          justifyContent="space-evenly"
                        >
                          {currentSession.startTime} - {currentSession.endTime} 
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  {/* Room */}
                  <Card
                    sx={{
                      boxShadow: "3",
                      borderRadius: "16px",
                      width: "60%",
                      height: "100%",
                    }}
                  >
                    Room
                    <CardActionArea
                      width="100%"
                      height="100%"
                    >
                      <CardContent width="100%" height="1000px">
                        <Stack
                          margin="0"
                          direction="row"
                          width="100%"
                          height="100%"
                          justifyContent="space-evenly"
                        >
                          {currentSession.roomNo}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  {/* Date */}
                  <Card
                    sx={{
                      boxShadow: "3",
                      borderRadius: "16px",
                      width: "60%",
                      height: "100%",
                    }}
                  >
                    Date
                    <CardActionArea
                      width="100%"
                      height="100%"
                    >
                      <CardContent width="100%" height="1000px">
                        <Stack
                          margin="0"
                          direction="row"
                          width="100%"
                          height="100%"
                          justifyContent="space-evenly"
                        >
                          {currentSession.date}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      width: 150,
                      backgroundColor: "#505e50",
                      textTransform: "none",
                      fontFamily: "Fira Sans",
                      fontSize: 12,
                      borderRadius: "16px"
                    }}
                    onClick={() => selectSession(currentSession.id)}
                  >
                    Select
                  </Button>
                </Stack>


          </Card>
      )}

          
        </Stack>
        </Grid>
        </Container>

    </>
  );
}

export default SessionSelectionStudent;