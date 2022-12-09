import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid';
import { StyledEngineProvider } from '@mui/material/styles';
import Axios from 'axios';
import { CircularProgress } from "@mui/material";


import '../../styling/pastSession.css'
import { Container, Stack } from '@mui/system'

function PastSessionsTutor() {

    const [data, setData] = useState(null)

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setData(response.data)
        })
    }, [])

    return (
        <StyledEngineProvider injectFirst>
            <Container maxWidth="lg">
                <h1 align="left" style={{ fontWeight: "bold", color: "#686516", marginTop: "4%", marginBottom: "4%" }}>
                    My Past Sessions
                </h1>

                {!data ?
                    <CircularProgress thickness="5" size="60px" style={{ 'color': "#9c9b65" }} />
                    :
                    <Stack spacing={5}>
                        {data.map(entry => (
                            <Card variant="outlined">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4} pt={10}>
                                        <containerText padding="4px">{entry.firstName}</containerText>
                                    </Grid>
                                    <Grid item xs={4} pt={10}>
                                        <containerText>{entry.lastName}</containerText>
                                    </Grid>
                                    <Grid item xs={4} pt={10}>
                                        <containerText>{entry.email}</containerText>
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

