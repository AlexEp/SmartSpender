import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  public getLineChartData(): ChartConfiguration<'line'>['data'] {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [120, 150, 180, 170, 160, 190, 200],
          label: 'Weekly Sales',
          fill: true,
          tension: 0.4,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
        },
      ],
    };
  }

  public getPieChartData() {
    return {
      labels: ['Electronics', 'Groceries', 'Clothing', 'Utilities'],
      datasets: [
        {
          data: [350, 450, 200, 150],
        },
      ],
    };
  }

  public getBarChartData(): ChartConfiguration<'bar'>['data'] {
    return {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { data: [80, 85, 70, 90], label: 'Product A' },
        { data: [60, 65, 80, 75], label: 'Product B' },
      ],
    };
  }

  public getDoughnutChartData() {
    return {
      labels: ['Social Media', 'Website', 'Email', 'Affiliates'],
      datasets: [
        {
          data: [250, 350, 300, 150],
        },
      ],
    };
  }

  public getRadarChartData(): ChartConfiguration<'radar'>['data'] {
    return {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running',
      ],
      datasets: [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Person A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Person B' },
      ],
    };
  }

  public getPolarAreaChartData() {
    return {
      labels: ['Laptops', 'Desktops', 'Tablets', 'Mobile Phones', 'Accessories'],
      datasets: [
        {
          data: [300, 400, 250, 500, 150],
        },
      ],
    };
  }
}
