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
    const [tutorId, setTutorId] = useState("");
    const [subject, setSubject] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])
    const [subjects, setSubjects] = useState([])

    const [subjectSelection, setSubjectSelection] = useState("");
    const [roomSelection, setRoomSelection] = useState("");


    useEffect(() => {
        Axios.get('http://localhost:3001/api/room').then((response) => {
            setRooms(response.data)
            console.log("inside axios" + response.data)
        })
        
        Axios.get('http://localhost:3001/api/subject').then((response) => {
            setSubjects(response.data)
            console.log("inside axios" + response.data)
        })

    }, [])

    const handleChangeSubject = (event) => {
        setSubjectSelection(event.target.value);
        console.log("subject selection:" + subjectSelection);
      };

      const handleChangeRoom = (event) => {
        setRoomSelection(event.target.value);
        console.log("room selection:" + roomSelection);
      };


    /*
    const handleSubmit = (event) => {
        navigate("/editAvailability");
    }
    */

    
    const handleSubmit = (event) => {
        console.log("submit clicked");
        console.log(tutorId);
        console.log(subject);
        console.log(startTime);
        console.log(endTime);
        console.log(roomNo);
        console.log(date);
        Axios.post('http://localhost:3001/api/addNew', {
          tutorId: 1,
          subject: subjectSelection, 
          startTime: startTime, 
          endTime: endTime, 
          roomNo: roomSelection,
          date: date
        }).then((response) => {
            console.log(response);
            alert('success');
        })
        navigate("/editAvailability");
      }
      

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

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >Subject</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subjectSelection}
                    label="Subject Selection"
                    onChange={handleChangeSubject}
                >
                    {subjects.map((currentSubject) =>
                    <MenuItem value={currentSubject.id}>{currentSubject.name}</MenuItem>
                    )}
                </Select>
                </FormControl>

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
                    value={roomSelection}
                    label="Room Selection"
                    onChange={handleChangeRoom}
                >
                    {rooms.map((currentRoom) =>
                    <MenuItem value={currentRoom.id}>{currentRoom.roomNo}</MenuItem>
                    )}
                </Select>
                </FormControl>

                <TextField
                    label="Date (MM/DD/YYYY)"
                    onChange={(event) => setDate(event.target.value)} // save date from user input
                    />
            
              </Stack>

            </FormControl>

            <Button
              type="button"
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