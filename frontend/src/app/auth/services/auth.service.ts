import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../api/user';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.API_URL}/doc-gpt/auth`;
  private _user = new BehaviorSubject<User | null>(null);

  constructor(
    private httpClient: HttpClient,
    private local: LocalStorageService,
    private router: Router
  ) {
    this._user.next(this.local.getUser());
  }

  signin(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<User>(`${this.url}/signin`, { email: email, password: password })
      .pipe(
        tap((u) => {
          this.local.setUser(u);
          this._user.next(u);
          this.router.navigate(['/']);
        })
      );
  }
  signup(email: string, password: string): Observable<User> {
    return this.httpClient.post<any>(`${this.url}/signup`, {
      email: email,
      password: password
    });
  }

  signout() {
    this.local.removeUser();
    this._user.next(null);
    this.router.navigate(['auth', 'signin']);
  }

  getUser(): User | null {
    return this._user.value;
  }

  isAuth(): Observable<boolean> {
    return this._user.asObservable().pipe(map((u) => u !== null));
  }
}
