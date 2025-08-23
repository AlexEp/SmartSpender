import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import BusinessToCategoryTab from '../components/comparison/BusinessToCategoryTab'; // To be created
import CategoryToBusinessTab from '../components/comparison/CategoryToBusinessTab'; // To be created

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
      id={`comparison-tabpanel-${index}`}
      aria-labelledby={`comparison-tab-${index}`}
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

const BusinessCategoryComparison = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="comparison tabs">
          <Tab label="Business to Category" id="comparison-tab-0" />
          <Tab label="Category to Business" id="comparison-tab-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BusinessToCategoryTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryToBusinessTab />
      </TabPanel>
    </Box>
  );
};

export default BusinessCategoryComparison;
