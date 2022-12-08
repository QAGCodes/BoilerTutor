import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';

function Navbar() {
    return (
        
        <AppBar position="static" style={{ background: '#505e50' }}>
        <Toolbar variant="dense">
            <IconButton edge="start" sx={{ color: "#FFFFFF" }} aria-label="menu">
                <MenuIcon></MenuIcon>
            </IconButton>
          <Typography variant="h6" component="div" fontFamily='Fira Sans' sx={{ flexGrow: 0.03 , fontWeight: 'bold'}}>
            BoilerTutor
          </Typography>
        </Toolbar>
        </AppBar>

    );
}

export default Navbar;
