import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsComponent } from '../charts/charts';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../dtos/category.dto';
import { CategoryMonthlySummaryComponent } from '../category-monthly-summary/category-monthly-summary';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ChartsComponent,
    CategoryMonthlySummaryComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  categories: CategoryDto[] = [];
  selectedCategoryId: number | null = null;
  categoryControl = new FormControl<string | CategoryDto>('');
  filteredCategories!: Observable<CategoryDto[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = this.categoryControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.categoryName;
          return name ? this._filter(name as string) : this.categories.slice();
        }),
      );
    });
  }

  private _filter(name: string): CategoryDto[] {
    const filterValue = name.toLowerCase();
    return this.categories.filter(option => option.categoryName.toLowerCase().includes(filterValue));
  }

  displayFn(category: CategoryDto): string {
    return category && category.categoryName ? category.categoryName : '';
  }

  loadSummary(): void {
    const selectedCategory = this.categoryControl.value as CategoryDto;
    if (selectedCategory && selectedCategory.categoryId) {
      this.selectedCategoryId = selectedCategory.categoryId;
    }
  }
}
