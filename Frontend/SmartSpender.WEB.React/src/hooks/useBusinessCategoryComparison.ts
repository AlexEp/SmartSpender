import { useQuery } from '@tanstack/react-query';
import { getBusinessCategoryComparison } from '../services/api';

export const useBusinessCategoryComparison = (businessId: number | null) => {
  return useQuery({
    queryKey: ['businessCategoryComparison', businessId],
    queryFn: () => getBusinessCategoryComparison(businessId!),
    enabled: !!businessId,
  });
};
