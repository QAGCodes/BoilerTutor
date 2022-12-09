import * as React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid';
import { StyledEngineProvider } from '@mui/material/styles';

import { Container, Stack } from '@mui/system'
import '../../styling/pastSession.css'

function PastSessionsStudent() {
    
    return (
        <StyledEngineProvider injectFirst>
            <Container maxWidth="lg">
                <h1 align="left"  style={{ fontWeight: "bold", color: "#686516", marginTop: "4%", marginBottom: "4%"}}>
                    My Past Sessions
                </h1>
                
                <Stack spacing={5}>

                    <Card variant="outlined">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4} pt={10}>
                                <containerText padding="4px">Course</containerText>
                            </Grid>
                            <Grid item xs={4} pt={10}>
                                <containerText>Tutor</containerText>
                            </Grid>
                            <Grid item xs={4} pt={10}>
                                <containerText>Time</containerText>
                            </Grid>
                        </Grid>
                    </Card>

                    <Card variant="outlined">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4} pt={10}>
                                <containerText padding="4px">Course</containerText>
                            </Grid>
                            <Grid item xs={4} pt={10}>
                                <containerText>Tutor</containerText>
                            </Grid>
                            <Grid item xs={4} pt={10}>
                                <containerText>Time</containerText>
                            </Grid>
                        </Grid>
                    </Card>

                    <Card variant="outlined">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4} pt={10}>
                                <containerText padding="4px">Course</containerText>
                            </Grid>
                            <Grid item xs={4} pt={10}>
                                <containerText>Tutor</containerText>
                            </Grid>
                            <Grid item xs={4} pt={10}>
                                <containerText>Time</containerText>
                            </Grid>
                        </Grid>
                    </Card>
                </Stack>
            </Container>
        </StyledEngineProvider>
    )
}


export default PastSessionsStudent;

