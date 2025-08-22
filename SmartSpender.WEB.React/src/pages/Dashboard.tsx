import { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import MonthlyReport from '../components/dashboard/MonthlyReport'; // Will create this
import CategoryMonthReport from '../components/dashboard/CategoryMonthReport'; // Will create this

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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
          <Tab label="Monthly Report" id="dashboard-tab-0" />
          <Tab label="Category Month Report" id="dashboard-tab-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MonthlyReport />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryMonthReport />
      </TabPanel>
    </Box>
  );
};

export default Dashboard;
