import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../api/user';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/doc-gpt/auth';
  private _user = new BehaviorSubject<User | null>(null);

  constructor(
    private httpClient: HttpClient,
    private local: LocalStorageService,
    private router: Router
  ) {
    this._user.next(this.local.getUser());
  }

  signin(email: string, password: string) {
    this.httpClient
      .post<User>(`${this.url}/signin`, { email: email, password: password })
      .pipe(
        tap((u) => {
          this.local.setUser(u);
          this.router.navigate(['/']);
        })
      )
      .subscribe((u) => this._user.next(u));
  }

  signup(email: string, password: string) {
    this.httpClient
      .post<any>(`${this.url}/signup`, { email: email, password: password })
      .pipe(tap(() => this.signin(email, password)))
      .subscribe();
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
