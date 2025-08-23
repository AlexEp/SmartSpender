import axios from 'axios';
import { Business } from '../types/Business';
import { Category } from '../types/Category';
import { Transaction } from '../types/Transaction';
import { CategoryMonthlyPieChart } from '../types/CategoryMonthlyPieChart';
import { CategoryMonthlySummary } from '../types/CategoryMonthlySummary';
import { BusinessCategoryComparison } from '../types/BusinessCategoryComparison';
import { CategoryBusinessComparison } from '../types/CategoryBusinessComparison';
import { UpdateBusinessCategories } from '../types/UpdateBusinessCategories';
import { UpdateCategoryBusinesses } from '../types/UpdateCategoryBusinesses';

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
  const encodedCategoryName = encodeURIComponent(categoryName);
  const response = await apiClient.get(`/reporting/transactions/${year}/${month}/${encodedCategoryName}`);
  return response.data;
};

export const getUncategorizedTransactions = async (year: number, month: number): Promise<Transaction[]> => {
  const response = await apiClient.get(`/reporting/transactions/${year}/${month}/uncategorized`);
  return response.data;
};

export const getCategoryMonthlySummary = async (categoryId: number): Promise<CategoryMonthlySummary[]> => {
  const response = await apiClient.get(`/categories/${categoryId}/monthly-summary`);
  return response.data;
};

export const getBusinessCategoryComparison = async (businessId: number): Promise<BusinessCategoryComparison> => {
  const response = await apiClient.get(`/BusinessCategories/compare/business/${businessId}`);
  return response.data;
};

export const getCategoryBusinessComparison = async (categoryId: number): Promise<CategoryBusinessComparison> => {
  const response = await apiClient.get(`/BusinessCategories/compare/category/${categoryId}`);
  return response.data;
};

export const updateBusinessCategories = async (data: UpdateBusinessCategories): Promise<void> => {
  await apiClient.put('/BusinessCategories/UpdateBusinessCategories', data);
};

export const updateCategoryBusinesses = async (data: UpdateCategoryBusinesses): Promise<void> => {
  await apiClient.put('/BusinessCategories/UpdateCategoryBusinesses', data);
};
