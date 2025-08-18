import { BusinessDto } from './business.dto';
import { CategoryDto } from './category.dto';

export interface CategoryBusinessComparisonDto {
  category: CategoryDto;
  includedBusinesses: BusinessDto[];
  notIncludedBusinesses: BusinessDto[];
}
