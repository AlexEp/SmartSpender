import { useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardHeader, Divider, ButtonGroup } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useCategoryMonthlySummary } from '../../hooks/useCategoryMonthlySummary';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface CategoryMonthlySummaryProps {
  categoryId: number | null;
}

const CategoryMonthlySummary = ({ categoryId }: CategoryMonthlySummaryProps) => {
  const { data: summary, isLoading, error } = useCategoryMonthlySummary(categoryId);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;
  if (!summary || summary.length === 0) return <Typography color="text.secondary">No data available for this category.</Typography>;

  const sortedSummary = [...summary].sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });

  const chartLabels = sortedSummary.map(item => `${item.year}/${item.month}`);
  const priceData = sortedSummary.map(item => item.totalPrice);
  const entriesData = sortedSummary.map(item => item.totalEntries);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Total Price',
        data: priceData,
        borderColor: 'rgba(79, 70, 229, 1)', // Indigo
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'Total Entries',
        data: entriesData,
        borderColor: 'rgba(16, 185, 129, 1)', // Emerald
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        yAxisID: 'y1',
        tension: 0.3,
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
    }
  };

  const ChartComponent = chartType === 'line' ? Line : Bar;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardHeader
          title="Trend Analysis"
          action={
            <ButtonGroup size="small" aria-label="chart type">
              <Button
                variant={chartType === 'line' ? 'contained' : 'outlined'}
                onClick={() => setChartType('line')}
              >
                <ShowChartIcon />
              </Button>
              <Button
                variant={chartType === 'bar' ? 'contained' : 'outlined'}
                onClick={() => setChartType('bar')}
              >
                <BarChartIcon />
              </Button>
            </ButtonGroup>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 400 }}>
            <ChartComponent data={chartData} options={chartOptions} />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Detailed History" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell align="center">Total Entries</TableCell>
                <TableCell align="right">Total Spending</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSummary.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell variant="head" sx={{ color: 'text.primary', fontWeight: 500 }}>
                    {item.year}/{item.month.toString().padStart(2, '0')}
                  </TableCell>
                  <TableCell align="center">{item.totalEntries}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ${item.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default CategoryMonthlySummary;
