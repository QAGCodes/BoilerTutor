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
import '../styling/styles.css';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();


  const submit = (e) => {
    e.preventDefault();
    Axios.get('http://localhost:3001/api/auth', {
      params: {
      email: email, 
      password: password
      }
    }).then((result) => {
      // fetched data from SQL
      let resultData = result.data

      // if a match was found in the database based on email and password
      if (resultData.length == 1) {
        let loggedUser = {
          id: resultData[0].id,
          firstName: resultData[0].firstName,
          lastName: resultData[0].lastName,
          classStanding: resultData[0].classStanding,
          email: resultData[0].email,
          role: resultData[0].role
        }
        
        /*
         * This is how the currently-logged user info will be stored. The second line is how to get that info.
         * On logout, sessionStorage.removeItem() must be used.
         */
        sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser))

        console.log(JSON.parse(sessionStorage.getItem("loggedUser")))

        //alert('successful');
        navigate("/home", {replace: true})

      }
      else if (resultData.length == 0) { // if no match found
        alert('invalid credentials');
      }
      else { // if for some reason, multiple records are returned
        alert('Something is not right here...');
        console.log(result)
      }
    })
  }


  return (
    <Container maxWidth="true" disableGutters="true">
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

          <h5 align="left" style={{ fontWeight: "bold", marginTop: "40%", marginLeft: "20%", marginRight: "20%", color: "#505e50", fontSize: 55, textAlign: "center"}}>
            Welcome to BoilerTutor!
            <br></br>
            👋
          </h5>

          <h4 align="left" style={{ fontWeight: "normal", marginTop: "-10%", marginLeft: "20%", marginRight: "20%", color: "#505e50", fontSize: 20, textAlign: "center"}}>
            To get started, sign in to your account or sign up for one today!
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
              <h1 style={{ textAlign: "left", fontWeight: "normal" , color: "#505e50"}}>
                Sign In
              </h1>

              {/* Components Stack */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
                width="70%"
              >

                {/* Email field */}
                <TextField
                  label="Email"
                  onChange={(event) => setEmail(event.target.value)} // save username from user input
                />

                {/* Password field */}
                <TextField
                  label="Password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)} // save password from user input
                />

                {/* Sign in button */}
                <Box textAlign='center'>
                <Button
                  variant="contained"
                  style={{
                    width: 120,
                    backgroundColor: "#505e50",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    fontSize: 15
                    }}
                    onClick={submit}
                >
                  Sign In
                </Button>
                </Box>

                <br></br>

                {/* Sign up button */}
                <h4 style={{ color: "#505e50", marginBottom: "0" }}>
                  Don't have an account?
                </h4>
                <Box textAlign='center'>
                <Button
                  variant="contained"
                  style={{
                    width: 120,
                    backgroundColor: "#505e50",
                    textTransform: "none",
                    fontFamily: "Fira Sans",
                    alignItems: "center",
                    fontSize: 15
                  }}
                  onClick={(e) => {
                    navigate("/", {replace: true})
                  }}
                >
                  Sign Up
                </Button>
                </Box>

              </Stack>
            </Stack>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

export default Login;

