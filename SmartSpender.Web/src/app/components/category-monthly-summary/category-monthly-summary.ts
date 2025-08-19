import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CategoryMonthlySummaryDto } from '../../dtos/category-monthly-summary.dto';

@Component({
  selector: 'app-category-monthly-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-monthly-summary.html',
  styleUrls: ['./category-monthly-summary.scss']
})
export class CategoryMonthlySummaryComponent implements OnChanges {
  @Input() categoryId: number | null = null;
  summary: CategoryMonthlySummaryDto[] = [];
  isLoading = false;

  constructor(private categoryService: CategoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] && this.categoryId) {
      this.loadSummary();
    }
  }

  loadSummary(): void {
    if (!this.categoryId) {
      return;
    }
    this.isLoading = true;
    this.categoryService.getCategoryMonthlySummary(this.categoryId).subscribe(data => {
      this.summary = data;
      this.isLoading = false;
    });
  }
}
