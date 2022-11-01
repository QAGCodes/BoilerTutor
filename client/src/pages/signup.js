import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import '../styling/signup.css';
import Axios from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classStanding, setStanding] = useState("");

  const submit = () => {
    Axios.post('http://localhost:3001/api/insert', {
      firstName: firstName, 
      lastName: lastName, 
      emailAddress: emailAddress, 
      password: password, 
      classStanding: classStanding
    }).then(() => {
      alert('successful');
    })
  }


  return (
    <Container maxWidth="xl" disableGutters="true">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems={"left"}
        style={{ background: "#F7FADD" }}
      >
        {/* Instructions information */}
        <Stack
          sx={{ height: "100vh", width: "90%" }}
          alignItems="flex-start"
          justifyContent="stretch"
          spacing={4}
        >

          <h5 align="left" style={{ fontWeight: "bold", marginTop: "40%", marginLeft: "20%", marginRight: "20%", color: "#686516", fontSize: 55, textAlign: "center"}}>
            You're almost there!
          </h5>

          <h4 align="left" style={{ fontWeight: "normal", marginTop: "-10%", marginLeft: "20%", marginRight: "20%", color: "#686516", fontSize: 20, textAlign: "center"}}>
            Fill in the following fields to set up your account.
          </h4>
        </Stack>

        <div class="divider">
             
        </div>

        {/* Form Fields Stack */}
        <Box
          p={4}
          sx={{
            backgroundColor: "#ffffff",
            minHeight: "100%",
            display: "flex",
            width: "100%"
          }}
        >
          <Grid
            container
            direction="column"
            spacing={2}
            marginTop="5%"
          >
            <Stack width="100%" alignItems="center">
              {/* Logo */}
            </Stack>

            <Stack marginX="15%" width="100%">
              <h1 style={{ textAlign: "left", fontWeight: "normal" , color: "#686516"}}>
                Sign Up
              </h1>

              {/* Components Stack */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
                width="70%"
              >

                {/* Student or tutor toggle */}
                <ToggleButtonGroup
                color="primary"
                exclusive                   
                aria-label="Platform"
                    >
                    <ToggleButton value="web">Student</ToggleButton>
                    <ToggleButton value="android">Tutor</ToggleButton>
                    </ToggleButtonGroup>

                {/* First name field */}
                <TextField
                  label="First Name"
                  onChange={(event) => setFirstName(event.target.value)} // save email from user input
                />

                {/* Last name field */}
                <TextField
                  label="Last Name"
                  onChange={(event) => setLastName(event.target.value)} // save email from user input
                />

                {/* Class standing dropdown */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Class Standing
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="class"
                    onClick={(event) => setStanding(event.target.innerText)}
                  >
                    <MenuItem value={10}>Freshman</MenuItem>
                    <MenuItem value={20}>Sophomore</MenuItem>
                    <MenuItem value={30}>Junior</MenuItem>
                    <MenuItem value={40}>Senior</MenuItem>
                    <MenuItem value={50}>Grad Student</MenuItem>
                  </Select>
                </FormControl>

                {/* Email field */}
                <TextField
                  label="Email Address"
                  onChange={(event) => setEmail(event.target.value)} // save email from user input
                />

                {/* Password field */}
                <TextField
                  label="Password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)} // save password from user input
                />

                {/* Sign up button */}
            <Button
                  variant="contained"
                  style={{
                    width: 120,
                    backgroundColor: "#D0D4A1",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    alignItems: "center",
                    fontSize: 15
                  }}
                  onClick={submit}
                >
                  Sign Up
                </Button>

                {/* Sign in button */}
                <h4 style={{ color: "#686516", marginBottom: "0" }}>
                  Already have an account?
                </h4>
                <Button
                  variant="contained"
                  style={{
                    width: 120,
                    backgroundColor: "#D0D4A1",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    fontSize: 15
                  }}
                >
                  Sign In
                </Button>

                
              </Stack>
            </Stack>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

export default Signup;
