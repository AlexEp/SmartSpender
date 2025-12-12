import { useState } from 'react';
import { Typography, Box, CircularProgress, Alert, TextField, Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
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
          'rgba(79, 70, 229, 0.6)',   // Indigo
          'rgba(16, 185, 129, 0.6)',  // Emerald
          'rgba(245, 158, 11, 0.6)',  // Amber
          'rgba(59, 130, 246, 0.6)',  // Blue
          'rgba(239, 68, 68, 0.6)',   // Red
          'rgba(139, 92, 246, 0.6)',  // Violet
          'rgba(236, 72, 153, 0.6)',  // Pink
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handlePieClick = (_event: any, elements: any) => {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="600" color="text.primary">
          Monthly Report
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Year"
            type="number"
            value={yearInput}
            onChange={(e) => setYearInput(parseInt(e.target.value))}
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
          />
          <TextField
            label="Month"
            type="number"
            value={monthInput}
            onChange={(e) => setMonthInput(parseInt(e.target.value))}
            variant="outlined"
            size="small"
            sx={{ width: 80 }}
          />
          <Button variant="contained" onClick={handleLoad}>Load Data</Button>
          <Button variant="outlined" color="warning" onClick={handleShowUncategorized}>Uncategorized</Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Spending by Category" titleTypographyProps={{ variant: 'h6' }} />
            <Divider />
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
              {isLoadingPieChart && <CircularProgress />}
              {pieChartError && <Alert severity="error">{(pieChartError as Error).message}</Alert>}
              {pieChartData && pieChartData.length > 0 ? (
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                  <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false, onClick: handlePieClick }} height={300} />
                </Box>
              ) : (
                !isLoadingPieChart && reportParams.year && <Typography color="text.secondary">No data available for this period.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={showUncategorized ? 'Uncategorized Transactions' : `Transactions: ${reportParams.categoryName || 'Select a Slice'}`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent>
              {isLoadingTransactions && <CircularProgress />}
              {transactionsError && <Alert severity="error">{(transactionsError as Error).message}</Alert>}
              {isLoadingUncategorized && <CircularProgress />}
              {uncategorizedError && <Alert severity="error">{(uncategorizedError as Error).message}</Alert>}

              {showUncategorized ? (
                uncategorizedTransactions && <TransactionsTable transactions={uncategorizedTransactions} />
              ) : (
                transactions && <TransactionsTable transactions={transactions} />
              )}

              {!showUncategorized && !transactions && !isLoadingTransactions && (
                <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                  Click a slice on the chart to view category transactions.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyReport;
