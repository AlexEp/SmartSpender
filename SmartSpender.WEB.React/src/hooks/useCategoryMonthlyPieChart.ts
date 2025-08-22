import { useQuery } from '@tanstack/react-query';
import { getCategoryMonthlyPieChart } from '../services/api';

export const useCategoryMonthlyPieChart = (year: number, month: number) => {
  return useQuery({
    queryKey: ['categoryMonthlyPieChart', year, month],
    queryFn: () => getCategoryMonthlyPieChart(year, month),
  });
};
