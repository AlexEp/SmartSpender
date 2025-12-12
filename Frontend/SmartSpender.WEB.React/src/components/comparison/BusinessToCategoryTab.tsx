import { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Button, CircularProgress, Alert, Paper, Typography } from '@mui/material';
import { useBusinesses } from '../../hooks/useBusinesses';
import { useBusinessCategoryComparison } from '../../hooks/useBusinessCategoryComparison';
import { useUpdateBusinessCategories } from '../../hooks/useUpdateComparisons';
import { TransferList } from '../TransferList';
import { Business } from '../../types/Business';
import { Category } from '../../types/Category';

const BusinessToCategoryTab = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const { data: businesses, isLoading: isLoadingBusinesses } = useBusinesses();
  const { data: comparison, isLoading: isLoadingComparison, error: comparisonError } = useBusinessCategoryComparison(selectedBusiness?.businessId ?? null);
  const updateMutation = useUpdateBusinessCategories();

  const [included, setIncluded] = useState<Category[]>([]);
  const [notIncluded, setNotIncluded] = useState<Category[]>([]);

  useEffect(() => {
    if (comparison) {
      setIncluded(comparison.includedCategories);
      setNotIncluded(comparison.notIncludedCategories);
    } else {
      setIncluded([]);
      setNotIncluded([]);
    }
  }, [comparison]);

  const handleSave = () => {
    if (selectedBusiness) {
      updateMutation.mutate({
        businessId: selectedBusiness.businessId,
        categoryIds: included.map(c => c.categoryId),
      });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom color="text.primary">
          Business Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Select a business to assign associated categories.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <Autocomplete
          options={businesses || []}
          getOptionLabel={(option) => option.description}
          loading={isLoadingBusinesses}
          onChange={(_event, newValue) => {
            setSelectedBusiness(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Select Business" variant="outlined" />}
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      {isLoadingComparison && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {comparisonError && <Alert severity="error">{(comparisonError as Error).message}</Alert>}

      {selectedBusiness && !isLoadingComparison && (
        <Box sx={{ mt: 4 }}>
          <TransferList
            left={notIncluded}
            right={included}
            setLeft={setNotIncluded}
            setRight={setIncluded}
            renderItem={(item) => item.categoryName}
            idAccessor={(item) => item.categoryId}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={updateMutation.isPending}
              size="large"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Category Assignments'}
            </Button>
          </Box>
          {updateMutation.isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Changes saved successfully!</Alert>}
          {updateMutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{(updateMutation.error as Error).message}</Alert>}
        </Box>
      )}
    </Box>
  );
};

export default BusinessToCategoryTab;
