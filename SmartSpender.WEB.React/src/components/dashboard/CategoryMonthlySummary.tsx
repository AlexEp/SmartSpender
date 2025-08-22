import { useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useCategoryMonthlySummary } from '../../hooks/useCategoryMonthlySummary';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface CategoryMonthlySummaryProps {
  categoryId: number | null;
}

const CategoryMonthlySummary = ({ categoryId }: CategoryMonthlySummaryProps) => {
  const { data: summary, isLoading, error } = useCategoryMonthlySummary(categoryId);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [dataType, setDataType] = useState<'price' | 'entries'>('price');

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;
  if (!summary || summary.length === 0) return <Typography>No data available for this category.</Typography>;

  const chartLabels = summary.map(item => `${item.year}/${item.month}`);
  const chartDataValues = summary.map(item => dataType === 'price' ? item.totalPrice : item.totalEntries);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: dataType === 'price' ? 'Total Price' : 'Total Entries',
        data: chartDataValues,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const ChartComponent = chartType === 'line' ? Line : Bar;

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button variant={dataType === 'price' ? 'contained' : 'outlined'} onClick={() => setDataType('price')} sx={{ mr: 1 }}>
          Total Price
        </Button>
        <Button variant={dataType === 'entries' ? 'contained' : 'outlined'} onClick={() => setDataType('entries')} sx={{ mr: 1 }}>
          Total Entries
        </Button>
        <Button variant="outlined" onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}>
          Switch to {chartType === 'line' ? 'Bar' : 'Line'} Chart
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <ChartComponent data={chartData} />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Total Entries</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.month}</TableCell>
                <TableCell>{item.totalEntries}</TableCell>
                <TableCell align="right">${item.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryMonthlySummary;
