
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import Axios from "axios";

function EditAvailability() {
    
  return (
    <Container maxWidth="true" disableGutters="true">
      {/* Continer Grid Stack */}
      <Grid container direction="row" spacing={2} marginTop="5%">
        <Stack marginX="15%" width="100%" direction="row" spacing={68}>
          <h1
            style={{
              textAlign: "left",
              fontWeight: "normal",
              color: "#686516",
            }}
          >
            My Available Sessions
          </h1>

          {/* Add New button */}
          <Button
            variant="contained"
            style={{
              width: 150,
              height: 50,
              backgroundColor: "#D0D4A1",
              textTransform: "none",
              fontFamily: "Fira Sans",
              fontSize: 15
            }}
          >
            Add New
          </Button>
        </Stack>

        <Stack marginX="15%" width="100%" direction="row" spacing={25} sx={{ border: 1 }}>
          <h4>Course</h4>
          <h4> Time</h4>

          { /* TODO: turn this into a component and dynamically add based on tutor sessions, only accessed by tutor */ }
          <Stack>
             <Button>Cancel</Button>
              : <><Button>Reschedule</Button> <Button>Cancel</Button></>

          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
}

export default EditAvailability;