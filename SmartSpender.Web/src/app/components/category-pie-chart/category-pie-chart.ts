import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CategoryMonthlyPieChartDto } from '../../dtos/category-monthly-pie-chart.dto';

@Component({
  selector: 'app-category-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './category-pie-chart.html',
  styleUrls: ['./category-pie-chart.scss'],
})
export class CategoryPieChartComponent implements OnChanges {
  @Input() chartData: CategoryMonthlyPieChartDto[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }],
  };
  public pieChartLegend = true;
  private currentChartType: 'price' | 'entries' = 'price';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChart();
    }
  }

  showPriceChart(): void {
    this.currentChartType = 'price';
    this.updateChart();
  }

  showEntriesChart(): void {
    this.currentChartType = 'entries';
    this.updateChart();
  }

  private updateChart(): void {
    if (!this.chartData) {
      return;
    }

    const labels = this.chartData.map(item => item.categoryName);
    let data;

    if (this.currentChartType === 'price') {
      data = this.chartData.map(item => item.totalPrice);
    } else {
      data = this.chartData.map(item => item.totalEntries);
    }

    this.pieChartData = {
      labels: labels,
      datasets: [{
        data: data,
      }],
    };
  }
}
