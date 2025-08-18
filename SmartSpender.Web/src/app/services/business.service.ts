import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessDto } from '../dtos/business.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = `${environment.apiUrl}/businesses`;

  constructor(private http: HttpClient) { }

  getBusinesses(): Observable<BusinessDto[]> {
    return this.http.get<BusinessDto[]>(this.apiUrl);
  }
}
