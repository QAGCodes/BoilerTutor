import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const navItems = ['Dashboard', 'Past Sessions' ,'Logout'];

function Navbar() {
    return (
        
        <AppBar position="static" style={{ background: '#505e50' }}>
        <Toolbar>
          <Typography variant="h6" component="div" fontFamily='Fira Sans' sx={{ flexGrow: 0 , fontWeight: 'bold', fontSize: 27}}>
            BoilerTutor
          </Typography>
          <Box sx={{paddingLeft: 10}}>
            {navItems.map((item) => (
              <Button key={item} style={{padding: 15, textTransform: "none", fontFamily: "Fira Sans", color: "white", fontSize: 16}}>
                {item}
              </Button>
            ))}
          </Box>
     
        </Toolbar>
        </AppBar>

    );
}

export default Navbar;
