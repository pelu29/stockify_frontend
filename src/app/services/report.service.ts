
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = '/api/reports/stock';

  constructor(private http: HttpClient) {}

  downloadPDF(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/?format=pdf`, { responseType: 'blob' });
  }

  downloadCSV(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/?format=csv`, { responseType: 'blob' });
  }
}