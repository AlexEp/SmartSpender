import { useQuery } from '@tanstack/react-query';
import { getUncategorizedTransactions } from '../services/api';

export const useUncategorizedTransactions = (year: number | null, month: number | null, enabled: boolean) => {
  return useQuery({
    queryKey: ['uncategorized-transactions', year, month],
    queryFn: () => getUncategorizedTransactions(year!, month!),
    enabled: enabled && year !== null && month !== null,
  });
};
