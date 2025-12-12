import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBusinessCategories, updateCategoryBusinesses } from '../services/api';

export const useUpdateBusinessCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBusinessCategories,
    onSuccess: (_data, variables) => {
      // Invalidate and refetch the comparison query to get the updated data
      queryClient.invalidateQueries({ queryKey: ['businessCategoryComparison', variables.businessId] });
    },
  });
};

export const useUpdateCategoryBusinesses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryBusinesses,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categoryBusinessComparison', variables.categoryId] });
    },
  });
};
