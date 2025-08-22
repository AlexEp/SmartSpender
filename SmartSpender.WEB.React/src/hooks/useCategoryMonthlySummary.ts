import { useQuery } from '@tanstack/react-query';
import { getCategoryMonthlySummary } from '../services/api';

export const useCategoryMonthlySummary = (categoryId: number | null) => {
  return useQuery({
    queryKey: ['categoryMonthlySummary', categoryId],
    queryFn: () => getCategoryMonthlySummary(categoryId!),
    enabled: !!categoryId,
  });
};
