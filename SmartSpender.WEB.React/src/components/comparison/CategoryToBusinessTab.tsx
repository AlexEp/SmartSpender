import { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Button, CircularProgress, Alert, Paper, Typography } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';
import { useCategoryBusinessComparison } from '../../hooks/useCategoryBusinessComparison';
import { useUpdateCategoryBusinesses } from '../../hooks/useUpdateComparisons';
import { TransferList } from '../TransferList';
import { Category } from '../../types/Category';
import { Business } from '../../types/Business';

const CategoryToBusinessTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: comparison, isLoading: isLoadingComparison, error: comparisonError } = useCategoryBusinessComparison(selectedCategory?.categoryId ?? null);
  const updateMutation = useUpdateCategoryBusinesses();

  const [included, setIncluded] = useState<Business[]>([]);
  const [notIncluded, setNotIncluded] = useState<Business[]>([]);

  useEffect(() => {
    if (comparison) {
      setIncluded(comparison.includedBusinesses);
      setNotIncluded(comparison.notIncludedBusinesses);
    } else {
      setIncluded([]);
      setNotIncluded([]);
    }
  }, [comparison]);

  const handleSave = () => {
    if (selectedCategory) {
      updateMutation.mutate({
        categoryId: selectedCategory.categoryId,
        businessIds: included.map(b => b.businessId),
      });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom color="text.primary">
          Category Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Select a category to assign allowed businesses.
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
          renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" />}
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      {isLoadingComparison && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {comparisonError && <Alert severity="error">{(comparisonError as Error).message}</Alert>}

      {selectedCategory && !isLoadingComparison && (
        <Box sx={{ mt: 4 }}>
          <TransferList
            left={notIncluded}
            right={included}
            setLeft={setNotIncluded}
            setRight={setIncluded}
            renderItem={(item) => item.description}
            idAccessor={(item) => item.businessId}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={updateMutation.isPending}
              size="large"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Business Assignments'}
            </Button>
          </Box>
          {updateMutation.isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Changes saved successfully!</Alert>}
          {updateMutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{(updateMutation.error as Error).message}</Alert>}
        </Box>
      )}
    </Box>
  );
};

export default CategoryToBusinessTab;
