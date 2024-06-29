import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  private readonly httpClient!: HttpClient;

  private apiBase = 'http://localhost:8022/'; //troque pela URI do gateway em produção

  constructor(protected readonly injector: Injector) {
    if (injector == null || injector == undefined) {
      throw new Error('Injector não pode ser nulo');
    }

    this.httpClient = injector.get(HttpClient);
  }

  protected httpGet(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'CustomValue', // Cabeçalho personalizado
    });
    return this.httpClient.get(`${this.apiBase}${endpoint}`, {
      headers,
      withCredentials: true,
    });
  }

  protected httpPost(endpoint: string, dados: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'CustomValue', // Cabeçalho personalizado
    });
    return this.httpClient.post(`${this.apiBase}${endpoint}`, dados, {
      headers,
      withCredentials: true,
    });
  }

  protected httpPut(endpoint: string, dados: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'CustomValue', // Cabeçalho personalizado
    });
    return this.httpClient.put(`${this.apiBase}${endpoint}`, dados, {
      headers,
      withCredentials: true,
    });
  }

  protected httpDelete(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'CustomValue', // Cabeçalho personalizado
    });
    return this.httpClient.delete(`${this.apiBase}${endpoint}`, {
      headers,
      withCredentials: true,
    });
  }
}
