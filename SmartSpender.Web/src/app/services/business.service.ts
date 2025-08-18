import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { BusinessDto } from '../dtos/business.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = `${environment.apiUrl}/businesses`;
  private cache$: Observable<BusinessDto[]> | null = null;
  private lastUpdated: Date | null = null;

  constructor(private http: HttpClient) { }

  getBusinesses(): Observable<BusinessDto[]> {
    if (this.cache$ && this.isCacheValid()) {
      return this.cache$;
    }

    this.cache$ = this.http.get<BusinessDto[]>(this.apiUrl).pipe(
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
}
