import { useQuery } from '@tanstack/react-query';
import { getBusinesses } from '../services/api';

export const useBusinesses = () => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });
};
