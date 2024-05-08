/* login.service.ts */

import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  private isLoginPanelOpenSubject = new BehaviorSubject<boolean>(false);
  isLoginPanelOpen$ = this.isLoginPanelOpenSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  openLoginPanel() {
    this.isLoginPanelOpenSubject.next(true);
  }

  login(loginData: Login): Observable<User | null> {
    return this.http.get<User[]>(`${this.API_URL}/users`).pipe(
      map(users => users.find(user => user.email === loginData.email && user.password === loginData.password) || null),
      tap(user => {
        if (user) {
          localStorage.setItem('userId', user.id);
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError(() => {
        this.isLoggedInSubject.next(false);
        return of(null);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  logOut(){
    localStorage.removeItem('userId');
    
    this.isLoggedInSubject.next(false);
}

  closeLoginPanel() {
    this.isLoginPanelOpenSubject.next(false);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
   
  }


}
