import { Typography, Box, Button } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Typography variant="h4">Admin</Typography>
      <Box sx={{ my: 2 }}>
        <Button component={RouterLink} to="/admin/business" sx={{ mx: 1 }}>
          Business
        </Button>
        <Button component={RouterLink} to="/admin/category" sx={{ mx: 1 }}>
          Category
        </Button>
        <Button component={RouterLink} to="/admin/business-category-comparison" sx={{ mx: 1 }}>
          Business-Category Comparison
        </Button>
      </Box>
      <Outlet />
    </div>
  );
};

export default Admin;
