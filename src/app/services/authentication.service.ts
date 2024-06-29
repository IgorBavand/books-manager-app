import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpBaseService } from '../shared/base/http-base.service';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends HttpBaseService {
  private subjectUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

  private endpointLogin = 'api/auth/login';
  private endpointRefresh = 'api/auth/refresh-token';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  login(login: Login): Observable<any> {
    return this.httpPost(`${this.endpointLogin}`, login).pipe(
      map((response) => {
        this.storeTokens(response.accessToken, response.refreshToken);
        this.subjectUser.next(response.user);
        this.subjectLogin.next(true);
        return response.user;
      })
    );
  }

  logout() {
    this.clearTokens();
    this.subjectUser.next(null);
    this.subjectLogin.next(false);
  }

  isLogged(): Observable<any> {
    const token = this.getAccessToken();

    if (token) {
      this.subjectLogin.next(true);
    }

    return this.subjectLogin.asObservable();
  }

  getUser() {
    return this.subjectUser.asObservable();
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();

    console.log('refresh de token');

    if (!refreshToken) {
      this.logout();
      return throwError('No refresh token available');
    }

    return this.httpPost(`${this.endpointRefresh}`, {
      refreshToken: refreshToken,
    }).pipe(
      map((response) => {
        this.storeTokens(response.accessToken, response.refreshToken);
        return response;
      }),
      catchError((error) => {
        this.logout();
        return throwError(error);
      })
    );
  }

  private storeTokens(accessToken: string, refreshToken: string) {
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private getRefreshToken(): string | null {
    return sessionStorage.getItem('refresh_token');
  }

  private clearTokens() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
  }
}
