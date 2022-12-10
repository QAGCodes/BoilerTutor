import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

function AddNew() {

    /* Variables for new session that will be added */
    const [subject, setSubject] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [roomNo, setRoomNo] = useState("");

    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])
    const [selection, setSelection] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:3001/api/room').then((response) => {
            setRooms(response.data)
            console.log(response.data)
        })
    }, [])

    const handleChange = (event) => {
        setSelection(event.target.value);
        console.log(event.target.value);
      };

    const handleSubmit = (event) => {
        console.log("after add new " + selection);
        navigate("/editAvailability");
      };

    return (

        // subject
        // startTime
        // endTime
        // room (dropdown with all the room numbers)

        // insert subject into Subject
        // insert session into Session

        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
        >
          <Box sx={{ width: 1000 }}>
            
            <FormControl fullWidth>

            <Stack spacing={3}>

                <TextField
                    label="Subject"
                    onChange={(event) => setSubject(event.target.value)} // save subject from user input
                    />

                <TextField
                    label="Start Time (XX:XX AM/PM)"
                    onChange={(event) => setStartTime(event.target.value)} // save start time from user input
                    />

                <TextField
                    label="End Time (XX:XX AM/PM)"
                    onChange={(event) => setEndTime(event.target.value)} // save end time from user input
                    />

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >Room</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selection}
                    label="Selection"
                    onChange={handleChange}
                >
                    {rooms.map((currentRoom) =>
                    <MenuItem value={currentRoom.id}>{currentRoom.roomNo}</MenuItem>
                    )}
                </Select>
                </FormControl>
            
              </Stack>

            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                width: 150,
                backgroundColor: "#505e50",
                textTransform: "none",
                fontFamily: "Fira Sans",
                alignItems: "center",
                fontSize: 15,
                margin: 70
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
        
          </Box>
      </div>





    );


}

export default AddNew;