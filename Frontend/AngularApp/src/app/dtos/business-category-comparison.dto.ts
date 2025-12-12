import { BusinessDto } from './business.dto';
import { CategoryDto } from './category.dto';

export interface BusinessCategoryComparisonDto {
  business: BusinessDto;
  includedCategories: CategoryDto[];
  notIncludedCategories: CategoryDto[];
}
