import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessCategoryComparisonDto } from '../dtos/business-category-comparison.dto';
import { CategoryBusinessComparisonDto } from '../dtos/category-business-comparison.dto';
import { BusinessCategoryDto } from '../dtos/business-category.dto';
import { CreateBusinessCategoryDto } from '../dtos/create-business-category.dto';

@Injectable({
  providedIn: 'root'
})
export class BusinessCategoryService {
  private apiUrl = 'http://localhost:3010/api/BusinessCategories';

  constructor(private http: HttpClient) { }

  getBusinessCategories(): Observable<BusinessCategoryDto[]> {
    return this.http.get<BusinessCategoryDto[]>(this.apiUrl);
  }

  getBusinessCategoryComparison(businessId: number): Observable<BusinessCategoryComparisonDto> {
    return this.http.get<BusinessCategoryComparisonDto>(`${this.apiUrl}/compare/business/${businessId}`);
  }

  getCategoryBusinessComparison(categoryId: number): Observable<CategoryBusinessComparisonDto> {
    return this.http.get<CategoryBusinessComparisonDto>(`${this.apiUrl}/compare/category/${categoryId}`);
  }

  createBusinessCategory(dto: CreateBusinessCategoryDto): Observable<BusinessCategoryDto> {
    return this.http.post<BusinessCategoryDto>(this.apiUrl, dto);
  }

  deleteBusinessCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBusinessCategories(data: { businessId: number; categoryIds: number[] }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateBusinessCategories`, data);
  }

  updateCategoryBusinesses(data: { categoryId: number; businessIds: number[] }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateCategoryBusinesses`, data);
  }
}
