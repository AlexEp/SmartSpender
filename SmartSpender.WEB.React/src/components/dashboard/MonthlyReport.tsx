import { useState } from 'react';
import { Typography, Box, CircularProgress, Alert, Paper, TextField, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCategoryMonthlyPieChart } from '../../hooks/useCategoryMonthlyPieChart';
import { useTransactionsForCategory } from '../../hooks/useTransactionsForCategory';
import { useUncategorizedTransactions } from '../../hooks/useUncategorizedTransactions';
import TransactionsTable from '../TransactionsTable';
import Grid from '@mui/material/Grid';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReportParams {
  year: number | null;
  month: number | null;
  categoryName: string;
}

const MonthlyReport = () => {
  const [yearInput, setYearInput] = useState(new Date().getFullYear());
  const [monthInput, setMonthInput] = useState(new Date().getMonth() + 1);
  const [reportParams, setReportParams] = useState<ReportParams>({ year: null, month: null, categoryName: '' });
  const [showUncategorized, setShowUncategorized] = useState(false);

  const { data: pieChartData, isLoading: isLoadingPieChart, error: pieChartError } = useCategoryMonthlyPieChart(
    reportParams.year,
    reportParams.month
  );

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useTransactionsForCategory(
    reportParams.year,
    reportParams.month,
    reportParams.categoryName,
    !showUncategorized
  );

  const { data: uncategorizedTransactions, isLoading: isLoadingUncategorized, error: uncategorizedError } = useUncategorizedTransactions(
    reportParams.year,
    reportParams.month,
    showUncategorized
  );

  const handleLoad = () => {
    setReportParams({ year: yearInput, month: monthInput, categoryName: '' });
    setShowUncategorized(false);
  };

  const handleShowUncategorized = () => {
    setReportParams({ year: yearInput, month: monthInput, categoryName: '' });
    setShowUncategorized(true);
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
        setReportParams(prevParams => ({ ...prevParams, categoryName: categoryName }));
        setShowUncategorized(false);
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
          value={yearInput}
          onChange={(e) => setYearInput(parseInt(e.target.value))}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Month"
          type="number"
          value={monthInput}
          onChange={(e) => setMonthInput(parseInt(e.target.value))}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={handleLoad}>Load</Button>
        <Button variant="outlined" onClick={handleShowUncategorized}>Show Uncategorized</Button>
      </Box>

      <Grid container spacing={3}>
        {/* First grid item with the 'item' prop added */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Monthly Spending by Category</Typography>
            {isLoadingPieChart && <CircularProgress />}
            {pieChartError && <Alert severity="error">{(pieChartError as Error).message}</Alert>}
            {pieChartData && pieChartData.length > 0 ? (
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: true, onClick: handlePieClick }} />
            ) : (
              !isLoadingPieChart && reportParams.year && <Typography>No data available for this period.</Typography>
            )}
          </Paper>
        </Grid >

        {/* Second grid item with the 'item' prop added */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">
              {showUncategorized ? 'Uncategorized Transactions' : `Transactions for ${reportParams.categoryName || '...'}`}
            </Typography>
            {isLoadingTransactions && <CircularProgress />}
            {transactionsError && <Alert severity="error">{(transactionsError as Error).message}</Alert>}
            {isLoadingUncategorized && <CircularProgress />}
            {uncategorizedError && <Alert severity="error">{(uncategorizedError as Error).message}</Alert>}
            {showUncategorized ? (
              uncategorizedTransactions && <TransactionsTable transactions={uncategorizedTransactions} />
            ) : (
              transactions && <TransactionsTable transactions={transactions} />
            )}
          </Paper>
        </Grid >
      </Grid >
    </Box>
  );
};

export default MonthlyReport;
