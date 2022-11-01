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
    <div>
    <h1> All Users' Information </h1>
    {/*
    <table>
    <tr>
        <th>First Name</th>
        <th>Last Name</th> 
        <th>Class Standing</th>
        <th>Email</th>
        <th>Password</th> 
    </tr>
    <tr>
    <td> Placeholder </td>
    </tr>
    <tr>
        <td> Placeholder </td>
    </tr>
    </table>
    */}
    </div>
  );
}

export default Signup;
