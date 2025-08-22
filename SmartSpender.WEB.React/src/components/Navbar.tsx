import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', my: 2 }}>
      <Button component={RouterLink} to="/" sx={{ mx: 1 }}>
        Dashboard
      </Button>
      <Button component={RouterLink} to="/admin" sx={{ mx: 1 }}>
        Admin
      </Button>
      <Button component={RouterLink} to="/about" sx={{ mx: 1 }}>
        About
      </Button>
    </Box>
  );
};

export default Navbar;
