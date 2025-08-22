import { useQuery } from '@tanstack/react-query';
import { getTransactionsForCategory } from '../services/api';

export const useTransactionsForCategory = (year: number, month: number, categoryName: string) => {
  return useQuery({
    queryKey: ['transactions', year, month, categoryName],
    queryFn: () => getTransactionsForCategory(year, month, categoryName),
    enabled: !!categoryName, // Only run the query if a categoryName is provided
  });
};
