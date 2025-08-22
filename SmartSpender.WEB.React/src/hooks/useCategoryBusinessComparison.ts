import { useQuery } from '@tanstack/react-query';
import { getCategoryBusinessComparison } from '../services/api';

export const useCategoryBusinessComparison = (categoryId: number | null) => {
  return useQuery({
    queryKey: ['categoryBusinessComparison', categoryId],
    queryFn: () => getCategoryBusinessComparison(categoryId!),
    enabled: !!categoryId,
  });
};
