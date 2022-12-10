
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

function EditAvailability() {

  /* Change to be dynamic based on the current tutor who is logged in, currently Michelle */
  const tutorId = 1;

  const [sessions, setAvailableSessions] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/api/availableSessions', 
        {
          params: {
            tutorId: tutorId
          }
        }).then((response) => {
          console.log(response.data)
          setAvailableSessions(response.data)
        })
    }, [])

  const navigate = useNavigate();


  const handleAddNew = (event) => {
    navigate("/addNew");
  };



    /*
  const availableSessions = [
    {
      courseName: "CS 348",
      timeSlot: "1:00 PM - 2:00 PM",
      room: "SMTH 108"
    },
    {
      courseName: "CS 354",
      timeSlot: "9:00 AM - 10:15 AM",
      room: "MTHW 210"
    },
    {
      courseName: "EAPS 112",
      timeSlot: "12:00 PM - 1:00 PM",
      room: "WALC 1055"
    },
    {
      courseName: "CS 408",
      timeSlot: "11:00 AM - 12:15 PM",
      room: "LWSN B151"
    }
  ];
  */

    
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
            My Available Sessions
          </h1>
          <Button
            variant="contained"
            onClick ={handleAddNew}
            style={{
              width: 150,
              height: 50,
              backgroundColor: "#505e50",
              textTransform: "none",
              fontFamily: "Fira Sans",
              fontSize: 15
            }}
          >
            Add New
          </Button>
        </Stack>
        

        <Stack
          marginX="10%" width="80%" direction="column" 

        >
      
      {sessions.map((currentSession) => 
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
                          {currentSession.subjectId}
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
                    Delete
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

export default EditAvailability;