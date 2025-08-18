import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessDto } from '../dtos/business.dto';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = '/api/businesses';

  constructor(private http: HttpClient) { }

  getBusinesses(): Observable<BusinessDto[]> {
    return this.http.get<BusinessDto[]>(this.apiUrl);
  }
}
