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
import React, { useState } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import '../styling/signup.css';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security1, setSecurity1] = useState("");
  const [security2, setSecurity2] = useState("");


  return (
    <Container maxWidth="xl" disableGutters="true">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems={"left"}
        style={{ background: "#F7FADD" }}
      >
        {/* Left Stack */}
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

        {/* Right Components Stack */}
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
            //alignItems="center"
            spacing={2}
            marginTop="10%"
          >
            <Stack width="100%" alignItems="center">
              {/* Logo */}
            </Stack>

            <Stack marginX="15%" width="100%">
              {/* My Profile Title */}
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

                {/* Student or Tutor toggle */}
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
                  onChange={(event) => setEmail(event.target.value)} // save email from user input
                />

                {/* Last name field */}
                <TextField
                  label="Last Name"
                  onChange={(event) => setEmail(event.target.value)} // save email from user input
                />

                {/* Questionaire 1: What is your favorite sport? */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Class Standing
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="class"
                    onClick={(event) => setSecurity1(event.target.innerText)}
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

                {/* Get Started button */}
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
                >
                  Sign Up
                </Button>

                {/* Log in option */}
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
