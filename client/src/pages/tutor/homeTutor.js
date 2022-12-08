
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import Axios from "axios";

//TODO: sidebar addition is needed
function HomeTutor() {

  /* used to test changing dashboard based on user role (studen/tutor) */
  let isTutor = 0;

  return (
    <Container maxWidth="xl" disableGutters="true">
      {/* Continer Grid Stack */}
      <Grid container direction="row" spacing={2} marginTop="5%">
        <Stack marginX="15%" width="100%" direction="row" spacing={50}>
          <h1
            style={{
              textAlign: "left",
              fontWeight: "normal",
              color: "#686516",
            }}
          >
            My Upcoming Sessions
          </h1>

          {/* Request New button */}
          <Button
            variant="contained"
            style={{
              width: 150,
              height: 50,
              backgroundColor: "#D0D4A1",
              textTransform: "none",
              fontFamily: "Fira Sans",
              fontSize: 15,
            }}
          >
            Edit Availability
          </Button>
        </Stack>

        <Stack marginX="15%" width="100%" direction="row" spacing={25} sx={{ border: 1 }}>
          <h4>Course</h4>
          <h4>Tutor</h4>
          <h4> Time</h4>

          { /* TODO: turn this into a component and dynamically add based on student/tutor sessions */ }
          <Stack>
            {isTutor ?
             <Button>Cancel</Button>
              : <><Button>Reschedule</Button> <Button>Cancel</Button></>
            }

          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
}

export default HomeTutor;