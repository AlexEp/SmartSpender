import { Typography, Box, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useBusinesses } from '../hooks/useBusinesses';

const Business = () => {
  const { data: businesses, isLoading, error } = useBusinesses();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Businesses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businesses?.map((business) => (
              <TableRow key={business.businessId}>
                <TableCell>{business.businessId}</TableCell>
                <TableCell>{business.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Business;
