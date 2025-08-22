import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryMonthlyPieChartDto } from '../dtos/category-monthly-pie-chart.dto';
import { environment } from '../../environments/environment';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private apiUrl = `${environment.apiUrl}/reporting`;

  constructor(private http: HttpClient) { }

  getCategoryMonthlyPieChart(year: number, month: number): Observable<CategoryMonthlyPieChartDto[]> {
    return this.http.get<CategoryMonthlyPieChartDto[]>(`${this.apiUrl}/category-monthly-pie-chart`, {
      params: { year, month }
    });
  }

  getTransactionsForCategory(year: number, month: number, categoryName: string): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(`${this.apiUrl}/transactions/${year}/${month}/${categoryName}`);
  }
}
