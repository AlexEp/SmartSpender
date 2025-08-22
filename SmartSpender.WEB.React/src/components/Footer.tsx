import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} SmartSpender
      </Typography>
    </Box>
  );
};

export default Footer;
