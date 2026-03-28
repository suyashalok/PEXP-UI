import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/tokens';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiBaseUrl}${endpoint}`, { params });
  }

  post<TRequest, TResponse>(endpoint: string, body: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiBaseUrl}${endpoint}`, body);
  }

  patch<TRequest, TResponse>(endpoint: string, body: TRequest): Observable<TResponse> {
    return this.http.patch<TResponse>(`${this.apiBaseUrl}${endpoint}`, body);
  }
}
