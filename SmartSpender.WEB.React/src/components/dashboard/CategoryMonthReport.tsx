import { useState } from 'react';
import { Typography, Box, Autocomplete, TextField } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../types/Category';
import CategoryMonthlySummary from './CategoryMonthlySummary'; // Will create this next

const CategoryMonthReport = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Category Monthly Report</Typography>
      <Autocomplete
        options={categories || []}
        getOptionLabel={(option) => option.categoryName}
        loading={isLoadingCategories}
        onChange={(event, newValue) => {
          setSelectedCategory(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select a category" />}
        sx={{ width: 300, mb: 4 }}
      />
      {selectedCategory && <CategoryMonthlySummary categoryId={selectedCategory.categoryId} />}
    </Box>
  );
};

export default CategoryMonthReport;
