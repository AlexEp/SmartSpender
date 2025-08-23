import { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Button, CircularProgress, Alert } from '@mui/material';
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
      <Autocomplete
        options={categories || []}
        getOptionLabel={(option) => option.categoryName}
        loading={isLoadingCategories}
        onChange={(event, newValue) => {
          setSelectedCategory(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select a category" />}
        sx={{ width: 300, mb: 2 }}
      />

      {isLoadingComparison && <CircularProgress />}
      {comparisonError && <Alert severity="error">{(comparisonError as Error).message}</Alert>}

      {selectedCategory && !isLoadingComparison && (
        <>
          <TransferList
            left={notIncluded}
            right={included}
            setLeft={setNotIncluded}
            setRight={setIncluded}
            renderItem={(item) => item.description}
            idAccessor={(item) => item.businessId}
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

export default CategoryToBusinessTab;
