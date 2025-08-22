import { useState } from 'react';
import { Typography, Box, CircularProgress, Alert, Paper, Grid, TextField, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCategoryMonthlyPieChart } from '../../hooks/useCategoryMonthlyPieChart';
import { useTransactionsForCategory } from '../../hooks/useTransactionsForCategory';
import TransactionsTable from '../TransactionsTable';

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyReport = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [queryParams, setQueryParams] = useState<{ year: number; month: number } | null>(null);

  const { data: pieChartData, isLoading: isLoadingPieChart, error: pieChartError } = useCategoryMonthlyPieChart(
    queryParams?.year ?? null,
    queryParams?.month ?? null
  );

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useTransactionsForCategory(
    queryParams?.year ?? null,
    queryParams?.month ?? null,
    selectedCategory
  );

  const handleLoad = () => {
    setQueryParams({ year, month });
  };

  const chartData = {
    labels: pieChartData?.map(d => d.categoryName) || [],
    datasets: [
      {
        label: 'Total Spending',
        data: pieChartData?.map(d => d.totalPrice) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handlePieClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const chartElement = elements[0];
      const categoryName = pieChartData?.[chartElement.index]?.categoryName;
      if (categoryName) {
        setSelectedCategory(categoryName);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Monthly Report
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Month"
          type="number"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={handleLoad}>Load</Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Monthly Spending by Category</Typography>
            {isLoadingPieChart && <CircularProgress />}
            {pieChartError && <Alert severity="error">{(pieChartError as Error).message}</Alert>}
            {pieChartData && pieChartData.length > 0 ? (
              <Pie data={chartData} onClick={handlePieClick} />
            ) : (
              !isLoadingPieChart && queryParams && <Typography>No data available for this period.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">
              Transactions for {selectedCategory || '...'}
            </Typography>
            {isLoadingTransactions && <CircularProgress />}
            {transactionsError && <Alert severity="error">{(transactionsError as Error).message}</Alert>}
            {transactions && <TransactionsTable transactions={transactions} />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyReport;
