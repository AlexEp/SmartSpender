import { useState } from 'react';
import { Box, Tabs, Tab, Container, Typography } from '@mui/material';
import BusinessToCategoryTab from '../components/comparison/BusinessToCategoryTab';
import CategoryToBusinessTab from '../components/comparison/CategoryToBusinessTab';

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
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BusinessCategoryComparison = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
          Comparison Tools
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analyze relationships between businesses and categories.
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="comparison tabs"
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
    </Container>
  );
};

export default BusinessCategoryComparison;
