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
  const navigate = useNavigate();
  const location = useLocation();
  const currentSubject = location.state.Result;

  const availableSessions = [
    {
      tutorName: "Joe Biden",
      timeSlot: "3:00 PM - 4:00 PM",
      room: "BHEE 129"
    },
    {
      tutorName: "Donald Trump",
      timeSlot: "2:00 PM - 3:00 PM",
      room: "LWSN B158"
    },
    {
      tutorName: "Kamala Harris",
      timeSlot: "12:00 PM - 1:00 PM",
      room: "WALC 1055"
    }
  ];

  const array = ["hello", "2", "3"]
    
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
            Available Tutors and Timeslots for {currentSubject} -- query name later
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
              disableRipple: true
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
                    disableRipple
                  >
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
                          {currentSession.timeSlot}
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
                          {currentSession.room}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  <Button
                  variant="contained"
                  style={{
                    width: 150,
                    backgroundColor: "#505e50",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    fontSize: 12,
                    borderRadius: "16px"
                  }}
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