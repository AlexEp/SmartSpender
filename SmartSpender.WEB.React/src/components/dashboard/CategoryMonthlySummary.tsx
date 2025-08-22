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

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;
  if (!summary || summary.length === 0) return <Typography>No data available for this category.</Typography>;

  const chartLabels = summary.map(item => `${item.year}/${item.month}`);
  const priceData = summary.map(item => item.totalPrice);
  const entriesData = summary.map(item => item.totalEntries);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Total Price',
        data: priceData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'Total Entries',
        data: entriesData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Total Price ($)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Total Entries',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const ChartComponent = chartType === 'line' ? Line : Bar;

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}>
          Switch to {chartType === 'line' ? 'Bar' : 'Line'} Chart
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <ChartComponent data={chartData} options={chartOptions} />
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
