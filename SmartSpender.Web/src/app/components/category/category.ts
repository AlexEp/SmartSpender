import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../dtos/category.dto';
import { CommonModule } from '@angular/common';
import { CategoryMonthlySummaryComponent } from '../category-monthly-summary/category-monthly-summary';

@Component({
  selector: 'app-category',
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
  standalone: true,
  imports: [CommonModule, CategoryMonthlySummaryComponent],
})
export class CategoryComponent implements OnInit {
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
