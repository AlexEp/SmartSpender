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
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-business-category-comparison',
  templateUrl: './business-category-comparison.html',
  styleUrls: ['./business-category-comparison.scss'],
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatSelectModule, MatListModule, FormsModule, DragDropModule, MatButtonModule]
})
export class BusinessCategoryComparisonComponent implements OnInit {
  businesses: BusinessDto[] = [];
  categories: CategoryDto[] = [];
  selectedBusinessId?: number;
  selectedCategoryId?: number;
  businessComparison?: BusinessCategoryComparisonDto;
  categoryComparison?: CategoryBusinessComparisonDto;

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
      });
    }
  }

  onCategorySelectionChange(): void {
    if (this.selectedCategoryId) {
      this.businessCategoryService.getCategoryBusinessComparison(this.selectedCategoryId).subscribe(data => {
        this.categoryComparison = data;
      });
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
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
}
