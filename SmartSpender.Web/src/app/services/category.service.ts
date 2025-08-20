import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CategoryDto } from '../dtos/category.dto';
import { CategoryMonthlySummaryDto } from '../dtos/category-monthly-summary.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private cache$: Observable<CategoryDto[]> | null = null;
  private lastUpdated: Date | null = null;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryDto[]> {
    if (this.cache$ && this.isCacheValid()) {
      return this.cache$;
    }

    this.cache$ = this.http.get<CategoryDto[]>(this.apiUrl).pipe(
      tap(() => {
        this.lastUpdated = new Date();
      })
    );

    return this.cache$;
  }

  private isCacheValid(): boolean {
    if (!this.lastUpdated) {
      return false;
    }
    const tenMinutes = 10 * 60 * 1000;
    const now = new Date();
    return (now.getTime() - this.lastUpdated.getTime()) < tenMinutes;
  }

  invalidateCache() {
    this.cache$ = null;
    this.lastUpdated = null;
  }

  getCategoryMonthlySummary(categoryId: number): Observable<CategoryMonthlySummaryDto[]> {
    return this.http.get<CategoryMonthlySummaryDto[]>(`${this.apiUrl}/${categoryId}/monthly-summary`);
  }
}
