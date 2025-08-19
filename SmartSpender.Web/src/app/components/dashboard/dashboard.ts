import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsComponent } from '../charts/charts';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../dtos/category.dto';
import { CategoryMonthlySummaryComponent } from '../category-monthly-summary/category-monthly-summary';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ChartsComponent,
    CategoryMonthlySummaryComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  categories: CategoryDto[] = [];
  selectedCategoryId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadSummary(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }
}
