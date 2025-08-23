import { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Button, CircularProgress, Alert } from '@mui/material';
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
      <Autocomplete
        options={businesses || []}
        getOptionLabel={(option) => option.description}
        loading={isLoadingBusinesses}
        onChange={(event, newValue) => {
          setSelectedBusiness(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select a business" />}
        sx={{ width: 300, mb: 2 }}
      />

      {isLoadingComparison && <CircularProgress />}
      {comparisonError && <Alert severity="error">{(comparisonError as Error).message}</Alert>}

      {selectedBusiness && !isLoadingComparison && (
        <>
          <TransferList
            left={notIncluded}
            right={included}
            setLeft={setNotIncluded}
            setRight={setIncluded}
            renderItem={(item) => item.categoryName}
            idAccessor={(item) => item.categoryId}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={updateMutation.isPending}
            sx={{ mt: 2 }}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
          {updateMutation.isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Changes saved successfully!</Alert>}
          {updateMutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{(updateMutation.error as Error).message}</Alert>}
        </>
      )}
    </Box>
  );
};

export default BusinessToCategoryTab;
