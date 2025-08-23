import { useQuery } from '@tanstack/react-query';
import { getTransactionsForCategory } from '../services/api';

export const useTransactionsForCategory = (year: number | null, month: number | null, categoryName: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['transactions', year, month, categoryName],
    queryFn: () => getTransactionsForCategory(year!, month!, categoryName),
    enabled: enabled && year !== null && month !== null && !!categoryName, // Only run the query if all params are provided
  });
};
