import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() categoryClicked = new EventEmitter<string>();

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

  public chartClicked(event: any): void {
    if (event.active && event.active.length > 0) {
      const chart = event.active[0].element.$context.chart;
      const index = event.active[0].index;
      const label = chart.data.labels[index];
      this.categoryClicked.emit(label);
    }
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
