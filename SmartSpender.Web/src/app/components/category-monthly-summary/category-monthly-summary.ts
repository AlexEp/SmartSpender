import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CategoryService } from '../../services/category.service';
import { CategoryMonthlySummaryDto } from '../../dtos/category-monthly-summary.dto';

@Component({
  selector: 'app-category-monthly-summary',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './category-monthly-summary.html',
  styleUrls: ['./category-monthly-summary.scss'],
})
export class CategoryMonthlySummaryComponent implements OnChanges {
  @Input() categoryId: number | null = null;
  summary: CategoryMonthlySummaryDto[] = [];
  isLoading = false;

  public lineChartData: ChartConfiguration<'line' | 'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  public lineChartOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  public chartType: 'line' | 'bar' = 'line';
  private currentChartType: 'price' | 'entries' = 'price';

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
    this.categoryService
      .getCategoryMonthlySummary(this.categoryId)
      .subscribe((data) => {
        this.summary = data;
        this.updateChart();
        this.isLoading = false;
      });
  }

  showPriceChart(): void {
    this.currentChartType = 'price';
    this.updateChart();
  }

  showEntriesChart(): void {
    this.currentChartType = 'entries';
    this.updateChart();
  }

  toggleChartType(): void {
    this.chartType = this.chartType === 'line' ? 'bar' : 'line';
  }

  private updateChart(): void {
    const labels = this.summary.map(item => `${item.year}/${item.month}`);
    let data;
    let label;

    if (this.currentChartType === 'price') {
      data = this.summary.map(item => item.totalPrice);
      label = 'Total Price';
    } else {
      data = this.summary.map(item => item.totalEntries);
      label = 'Total Entries';
    }

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: label,
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }
}
