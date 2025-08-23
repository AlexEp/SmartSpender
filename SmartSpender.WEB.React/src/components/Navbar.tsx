import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const activeLinkStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline',
};

const Navbar = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/"
        style={({ isActive }) => (isActive ? activeLinkStyle : {})}
        sx={{ color: 'white', mx: 1 }}
      >
        Dashboard
      </Button>
      <Button
        component={NavLink}
        to="/admin"
        style={({ isActive }) => (isActive ? activeLinkStyle : {})}
        sx={{ color: 'white', mx: 1 }}
      >
        Admin
      </Button>
      <Button
        component={NavLink}
        to="/about"
        style={({ isActive }) => (isActive ? activeLinkStyle : {})}
        sx={{ color: 'white', mx: 1 }}
      >
        About
      </Button>
    </>
  );
};

export default Navbar;
