import { useState } from 'react';
import { Typography, Box, Autocomplete, TextField, Paper } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../types/Category';
import CategoryMonthlySummary from './CategoryMonthlySummary'; // Will create this next

const CategoryMonthReport = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
          Category Report
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a category to view its historical performance and spending trends.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <Autocomplete
          options={categories || []}
          getOptionLabel={(option) => option.categoryName}
          loading={isLoadingCategories}
          onChange={(_event, newValue) => {
            setSelectedCategory(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Search Category" variant="outlined" />}
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      {selectedCategory ? (
        <CategoryMonthlySummary categoryId={selectedCategory.categoryId} />
      ) : (
        <Box sx={{ textAlign: 'center', py: 8, opacity: 0.6 }}>
          <Typography variant="h6">No Category Selected</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CategoryMonthReport;
