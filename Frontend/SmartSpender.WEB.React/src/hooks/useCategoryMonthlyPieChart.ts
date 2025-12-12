import { useQuery } from '@tanstack/react-query';
import { getCategoryMonthlyPieChart } from '../services/api';

export const useCategoryMonthlyPieChart = (year: number | null, month: number | null) => {
  return useQuery({
    queryKey: ['categoryMonthlyPieChart', year, month],
    queryFn: () => getCategoryMonthlyPieChart(year!, month!),
    enabled: year !== null && month !== null,
  });
};
