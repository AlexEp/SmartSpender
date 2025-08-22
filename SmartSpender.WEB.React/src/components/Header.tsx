import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Navbar from './Navbar';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SmartSpender
        </Typography>
        <Box>
          <Navbar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
