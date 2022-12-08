import React, { useState, useEffect } from "react";
import '../styling/styles.css';
import Axios from 'axios';

function Signup() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setAllUsers(response.data);
    })
  }, [])

  return (
    <div>
    <h1> All Users' Information </h1>

      {allUsers.map((user) => {
        return <p> <b>First Name:</b> {user.firstName} | <b>Last Name:</b> {user.lastName} | <b>Class Standing:</b> {user.classStanding} | <b>Email:</b> {user.emailAddress} | <b>Password:</b> {user.password} </p>
      })}

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
