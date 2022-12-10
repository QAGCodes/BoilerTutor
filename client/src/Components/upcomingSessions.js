import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";

function UpcomingSessions(props) {
  return (
    <Stack spacing={5}>
      <Card variant="outlined">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3} pt={10}>
            <containerText padding="4px">{props.session.subjectName}</containerText>
          </Grid>
          <Grid item xs={3} pt={10}>
                      <containerText>{ props.session.tutorName }</containerText>
          </Grid>
          <Grid item xs={3} pt={10}>
                      <containerText>{props.session.date}</containerText>
          </Grid>
          <Grid item xs={3} pt={10}>
            {props.role == "Tutor" ? (
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
              >
                Cancel
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  style={{
                    width: 150,
                    height: 50,
                    margin: 5,
                    backgroundColor: "#505e50",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    fontSize: 15,
                  }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="contained"
                  style={{
                    width: 150,
                    height: 50,
                    margin: 5,
                    backgroundColor: "#505e50",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}

export default UpcomingSessions;
