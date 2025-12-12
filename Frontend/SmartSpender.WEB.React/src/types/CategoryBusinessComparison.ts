import { Business } from './Business';
import { Category } from './Category';

export interface CategoryBusinessComparison {
  category: Category;
  includedBusinesses: Business[];
  notIncludedBusinesses: Business[];
}
