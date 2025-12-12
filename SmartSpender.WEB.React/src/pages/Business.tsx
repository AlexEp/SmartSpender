import { Typography, Box, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardHeader, Divider, IconButton, Tooltip } from '@mui/material';
import { useBusinesses } from '../hooks/useBusinesses';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Business = () => {
  const { data: businesses, isLoading, error } = useBusinesses();

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="600" color="text.primary">
            Business Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your registered businesses.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Business
        </Button>
      </Box>

      <Card>
        <CardHeader title="Businesses List" titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses?.map((business) => (
                <TableRow key={business.businessId} hover>
                  <TableCell>{business.businessId}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{business.description}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {businesses && businesses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No businesses found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Business;
