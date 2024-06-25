import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpBaseService } from '../shared/base/http-base.service';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends HttpBaseService {
  //subjects
  //behaviorSubjects

  private subjectUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

  private endpointLogin = 'api/auth';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  login(login: Login): Observable<any> {
    return this.httpPost(`${this.endpointLogin}`, login).pipe(
      map((reponse) => {
        sessionStorage.setItem('token', reponse.access_token);
        this.subjectUser.next(reponse.scope);
        this.subjectLogin.next(true);
        return reponse.scope;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.subjectUser.next(null);
    this.subjectLogin.next(false);
  }

  isLogged(): Observable<any> {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.subjectLogin.next(true);
    }

    return this.subjectLogin.asObservable();
  }

  getUser() {
    this.subjectUser.asObservable();
  }
}
