import { Business } from './Business';
import { Category } from './Category';

export interface BusinessCategoryComparison {
  business: Business;
  includedCategories: Category[];
  notIncludedCategories: Category[];
}
