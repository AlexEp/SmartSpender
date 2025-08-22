import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.html',
  styleUrls: ['./charts.scss'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class ChartsComponent implements OnInit {
  // Line Chart
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          minRotation: 0,
          maxRotation: 0,
        },
      },
    },
  };
  public lineChartLegend = true;

  // Pie Chart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels!: string[];
  public pieChartDatasets!: { data: number[] }[];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Bar Chart
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          minRotation: 0,
          maxRotation: 0,
        },
      },
    },
  };

  // Doughnut Chart
  public doughnutChartLabels!: string[];
  public doughnutChartDatasets!: { data: number[] }[];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
  };

  // Radar Chart
  public radarChartData!: ChartConfiguration<'radar'>['data'];
  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
  };
  public radarChartLegend = true;

  // Polar Area Chart
  public polarAreaChartLabels!: string[];
  public polarAreaChartDatasets!: { data: number[] }[];
  public polarAreaChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
  };
  public polarAreaLegend = true;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.lineChartData = this.mockDataService.getLineChartData();

    const pieChartData = this.mockDataService.getPieChartData();
    this.pieChartLabels = pieChartData.labels;
    this.pieChartDatasets = pieChartData.datasets;

    this.barChartData = this.mockDataService.getBarChartData();

    const doughnutChartData = this.mockDataService.getDoughnutChartData();
    this.doughnutChartLabels = doughnutChartData.labels;
    this.doughnutChartDatasets = doughnutChartData.datasets;

    this.radarChartData = this.mockDataService.getRadarChartData();

    const polarAreaChartData = this.mockDataService.getPolarAreaChartData();
    this.polarAreaChartLabels = polarAreaChartData.labels;
    this.polarAreaChartDatasets = polarAreaChartData.datasets;
  }
}
