import { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import MonthlyReport from '../components/dashboard/MonthlyReport';
import CategoryMonthReport from '../components/dashboard/CategoryMonthReport';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="dashboard tabs"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                mr: 4,
              }
            }}
          >
            <Tab label="Monthly Overview" id="dashboard-tab-0" />
            <Tab label="Category Analysis" id="dashboard-tab-1" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MonthlyReport />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CategoryMonthReport />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Dashboard;
