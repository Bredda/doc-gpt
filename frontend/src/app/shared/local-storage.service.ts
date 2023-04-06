import { Injectable } from '@angular/core';
import { User } from '../auth/api/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private KEY = "doc-gpt-user"

  constructor() { }


  public getUser():User |null{
    const userString = localStorage.getItem(this.KEY)
    return userString ? JSON.parse(userString) : null
  }

  public setUser(user: User): void {
    localStorage.setItem(this.KEY, JSON.stringify(user))
  }

  public removeUser(): void {
    localStorage.removeItem(this.KEY)
  }


}
