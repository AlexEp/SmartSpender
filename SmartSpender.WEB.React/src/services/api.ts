import axios from 'axios';
import { Business } from '../types/Business';
import { Category } from '../types/Category';
import { Transaction } from '../types/Transaction';
import { CategoryMonthlyPieChart } from '../types/CategoryMonthlyPieChart';

const apiClient = axios.create({
  baseURL: 'http://localhost:3010/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBusinesses = async (): Promise<Business[]> => {
  const response = await apiClient.get('/businesses');
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const getCategoryMonthlyPieChart = async (year: number, month: number): Promise<CategoryMonthlyPieChart[]> => {
  const response = await apiClient.get('/reporting/category-monthly-pie-chart', {
    params: { year, month },
  });
  return response.data;
};

export const getTransactionsForCategory = async (year: number, month: number, categoryName: string): Promise<Transaction[]> => {
  const response = await apiClient.get(`/reporting/transactions/${year}/${month}/${categoryName}`);
  return response.data;
};
