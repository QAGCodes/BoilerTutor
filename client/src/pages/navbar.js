import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const currUser = JSON.parse(sessionStorage.getItem("loggedUser"));

    const navigate = useNavigate();

    const dashboardClicked = (event) => {
        navigate("/home");
    }

    const pastSessionsClicked = (event) => {
        console.log("current user role" + currUser.role);
        if (currUser.role == "Student") {
            navigate("/pastSessionsStudent");
        } else if (currUser.role == "Tutor") {
            navigate("/pastSessionsTutor");
        }
    }

    const logoutClicked = (event) => {
        sessionStorage.removeItem("loggedUser")
        navigate("/login");
    }

    return (
        
        <AppBar position="static" style={{ background: '#505e50' }}>
        <Toolbar>
            <Button disableRipple onClick={dashboardClicked} style={{padding: 10, textTransform: "none", fontFamily: "Fira Sans", color: "white", fontSize: 27}}>
                <Typography variant="h6" component="div" fontFamily='Fira Sans' sx={{ flexGrow: 0 , fontWeight: 'bold', fontSize: 27}}>
                        BoilerTutor
                </Typography>
          </Button>
          <Grid container justifyContent="flex-end"> 
            <Box sx={{paddingLeft: 10}}>
                <Button onClick={dashboardClicked} style={{padding: 15, textTransform: "none", fontFamily: "Fira Sans", color: "white", fontSize: 16}}>
                    Dashboard
                </Button>
                <Button onClick={pastSessionsClicked} style={{padding: 15, textTransform: "none", fontFamily: "Fira Sans", color: "white", fontSize: 16}}>
                    Past Sessions
                </Button>
                <Button onClick={logoutClicked} style={{padding: 15, textTransform: "none", fontFamily: "Fira Sans", color: "white", fontSize: 16}}>
                    Logout
                </Button>
            </Box>
          </Grid>
     
        </Toolbar>
        </AppBar>

    );
}

export default Navbar;
