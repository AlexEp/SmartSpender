import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { CategoryService } from '../../services/category.service';
import { BusinessCategoryService } from '../../services/business-category.service';
import { BusinessDto } from '../../dtos/business.dto';
import { CategoryDto } from '../../dtos/category.dto';
import { BusinessCategoryComparisonDto } from '../../dtos/business-category-comparison.dto';
import { CategoryBusinessComparisonDto } from '../../dtos/category-business-comparison.dto';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-business-category-comparison',
  templateUrl: './business-category-comparison.html',
  styleUrls: ['./business-category-comparison.scss'],
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatSelectModule, MatListModule, FormsModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule]
})
export class BusinessCategoryComparisonComponent implements OnInit {
  businesses: BusinessDto[] = [];
  categories: CategoryDto[] = [];
  selectedBusinessId?: number;
  selectedCategoryId?: number;
  businessComparison?: BusinessCategoryComparisonDto;
  categoryComparison?: CategoryBusinessComparisonDto;

  filteredIncludedCategories: CategoryDto[] = [];
  filteredNotIncludedCategories: CategoryDto[] = [];
  filteredIncludedBusinesses: BusinessDto[] = [];
  filteredNotIncludedBusinesses: BusinessDto[] = [];

  constructor(
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private businessCategoryService: BusinessCategoryService
  ) { }

  ngOnInit(): void {
    console.log("BusinessCategoryComparisonComponent initialized");
    this.businessService.getBusinesses().subscribe(data => {
      this.businesses = data;
    });
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onBusinessSelectionChange(): void {
    if (this.selectedBusinessId) {
      this.businessCategoryService.getBusinessCategoryComparison(this.selectedBusinessId).subscribe(data => {
        this.businessComparison = data;
        this.filteredIncludedCategories = data.includedCategories;
        this.filteredNotIncludedCategories = data.notIncludedCategories;
      });
    }
  }

  onCategorySelectionChange(): void {
    if (this.selectedCategoryId) {
      this.businessCategoryService.getCategoryBusinessComparison(this.selectedCategoryId).subscribe(data => {
        this.categoryComparison = data;
        this.filteredIncludedBusinesses = data.includedBusinesses;
        this.filteredNotIncludedBusinesses = data.notIncludedBusinesses;
      });
    }
  }

  applyFilter(event: Event, listName: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!this.businessComparison || !this.categoryComparison) {
      return;
    }

    switch (listName) {
      case 'includedCategories':
        this.filteredIncludedCategories = this.businessComparison.includedCategories.filter(category =>
          category.categoryName.toLowerCase().includes(filterValue)
        );
        break;
      case 'notIncludedCategories':
        this.filteredNotIncludedCategories = this.businessComparison.notIncludedCategories.filter(category =>
          category.categoryName.toLowerCase().includes(filterValue)
        );
        break;
      case 'includedBusinesses':
        this.filteredIncludedBusinesses = this.categoryComparison.includedBusinesses.filter(business =>
          business.description.toLowerCase().includes(filterValue)
        );
        break;
      case 'notIncludedBusinesses':
        this.filteredNotIncludedBusinesses = this.categoryComparison.notIncludedBusinesses.filter(business =>
          business.description.toLowerCase().includes(filterValue)
        );
        break;
    }
  }

  saveBusinessCategoryChanges(): void {
    if (this.selectedBusinessId && this.businessComparison) {
      const updatedData = {
        businessId: this.selectedBusinessId,
        categoryIds: this.businessComparison.includedCategories.map(c => c.categoryId)
      };
      this.businessCategoryService.updateBusinessCategories(updatedData).subscribe(() => {
        // Optionally, show a success message
        console.log('Business-category relationships updated successfully.');
      });
    }
  }

  saveCategoryBusinessChanges(): void {
    if (this.selectedCategoryId && this.categoryComparison) {
      const updatedData = {
        categoryId: this.selectedCategoryId,
        businessIds: this.categoryComparison.includedBusinesses.map(b => b.businessId)
      };
      this.businessCategoryService.updateCategoryBusinesses(updatedData).subscribe(() => {
        // Optionally, show a success message
        console.log('Category-business relationships updated successfully.');
      });
    }
  }

  moveFromIncludedToNotIncluded(selected: any[]): void {
    if (!this.businessComparison) return;
    const selectedValues = selected.map(s => s.value);
    this.businessComparison.notIncludedCategories.push(...selectedValues);
    this.businessComparison.includedCategories = this.businessComparison.includedCategories.filter(c => !selectedValues.includes(c));
  }

  moveFromNotIncludedToIncluded(selected: any[]): void {
    if (!this.businessComparison) return;
    const selectedValues = selected.map(s => s.value);
    this.businessComparison.includedCategories.push(...selectedValues);
    this.businessComparison.notIncludedCategories = this.businessComparison.notIncludedCategories.filter(c => !selectedValues.includes(c));
  }

  moveFromIncludedToNotIncludedBusinesses(selected: any[]): void {
    if (!this.categoryComparison) return;
    const selectedValues = selected.map(s => s.value);
    this.categoryComparison.notIncludedBusinesses.push(...selectedValues);
    this.categoryComparison.includedBusinesses = this.categoryComparison.includedBusinesses.filter(b => !selectedValues.includes(b));
  }

  moveFromNotIncludedToIncludedBusinesses(selected: any[]): void {
    if (!this.categoryComparison) return;
    const selectedValues = selected.map(s => s.value);
    this.categoryComparison.includedBusinesses.push(...selectedValues);
    this.categoryComparison.notIncludedBusinesses = this.categoryComparison.notIncludedBusinesses.filter(b => !selectedValues.includes(b));
  }
}
