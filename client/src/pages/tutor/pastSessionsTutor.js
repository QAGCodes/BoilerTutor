import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid';
import { StyledEngineProvider } from '@mui/material/styles';
import Axios from 'axios';
import { CircularProgress } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';

import '../../styling/pastSession.css'
import { Container, Stack } from '@mui/system'

function PastSessionsTutor() {

    const curUser = JSON.parse(sessionStorage.getItem("loggedUser"))
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [selection, setSelection] = useState("");
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (curUser == null) {
            navigate("/login", {replace: true})
        } else if (curUser.role != "Tutor") {
            navigate("/pastSessionsStudent", {replace: true})
        }

        Axios.get('http://localhost:3001/api/getSubjects').then((response) => {
            setSubjects(response.data)
        })
        getAllSessions()
    }, [])

    const getAllSessions = () => {
        if (curUser == null) {
            return;
        }
        Axios.get('http://localhost:3001/api/tutorPastSessions', {
            params: {
                tutorId: curUser.id
            }
        }).then((response) => {
            setData(response.data)
        })
    }

    const handleChange = (event) => {
        if (event.target.value !== 0) {
            Axios.get('http://localhost:3001/api/tutorSubjectPastSessions', {
                params: {
                    tutorId: curUser.id,
                    subjectId: event.target.value
                }
            }).then((response) => {
                setData(response.data)
            })
        } else {
            getAllSessions()
        }
        
        setSelection(event.target.value);
    };

    return (
        <StyledEngineProvider injectFirst>
            <Container maxWidth="lg">
                <Grid container alignItems="center">
                    <h1 align="left" style={{ fontWeight: "bold", color: "#686516", marginTop: "4%", marginBottom: "4%" }}>
                        My Past Sessions
                    </h1>
                    <Grid item xs>
                        <Grid container direction="row-reverse">
                            <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selection}
                                    label="Subject"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>All</MenuItem>
                                    {subjects.map((currentSubject) =>
                                        <MenuItem value={currentSubject.id}>{currentSubject.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </Grid>


                {!data ?
                    <CircularProgress thickness="5" size="60px" style={{ 'color': "#9c9b65" }} />
                    :
                    <Stack spacing={5}>
                        {data.length === 0 &&
                            <containerText>No sessions matching the filter were found!</containerText>
                        }
                        {data.map(entry => (
                            <Card variant="outlined">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4} pt={10}>
                                        <containerText padding="4px">{entry.name}</containerText>
                                    </Grid>
                                    <Grid item xs={4} pt={10}>
                                        <containerText>{entry.firstName} {entry.lastName}</containerText>
                                    </Grid>
                                    <Grid item xs={4} pt={10}>
                                        <containerText>{entry.startTime} - {entry.endTime}, {entry.date}</containerText>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Stack>
                }

            </Container>
        </StyledEngineProvider>
    )
}


export default PastSessionsTutor;

