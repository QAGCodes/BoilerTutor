import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

function SubjectSelectionStudent() {

  const [subjects, setSubjects] = useState([])
  const [sub, setSub] = useState("")

    useEffect(() => {
        Axios.get('http://localhost:3001/api/subject').then((response) => {
            setSubjects(response.data)
            console.log(response.data)
        })
    }, [])

  /*const subjects = [ // Hard coded for now, extract from database in future
    { id: 0, 
      subject: "Math"
    },
    { id: 1, 
      subject: "Science"
    },
    { id: 2, 
      subject: "Social Studies"
    },
    { id: 3, 
      subject: "Spanish"
    },
    { id: 4, 
      subject: "Chinese"
    },
    { id: 5, 
      subject: "Chemistry"
    },
    { id: 6, 
      subject: "Data Structures and Algorithms"
    },
  ];*/

  const navigate = useNavigate();
  const [selection, setSelection] = useState("");


  const handleSubmit = (event) => {
    console.log(selection + " <- onclick submitted value");

    for (var i = 0; i < subjects.length; i++) {
      if (Number(subjects[i].id) == Number(selection)) {
        console.log(subjects[i].name + " <- chosen value")
        navigate("/sessionSelectionStudent", { // sends subject info to next page
          state: {
            Result: subjects[i]
          },
        });
      }
    }

  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelection(event.target.value);
    console.log(selection + " <-subject id");
  };
    
    return (
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
              <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selection}
                label="Selection"
                onChange={handleChange}
              >
                {subjects.map((currentSubject) =>
                  <MenuItem value={currentSubject.id}>{currentSubject.name}</MenuItem>
                )}
              </Select>
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
              Select
            </Button>
          </Box>
      </div>
    );
  }

export default SubjectSelectionStudent;