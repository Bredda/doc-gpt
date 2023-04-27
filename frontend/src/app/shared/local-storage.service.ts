import { Injectable } from '@angular/core';
import { User } from '../auth/api/user';
import { UserSettings } from '../docgpt/api/user-settings';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private KEY = 'doc-gpt-user';
  private SETTINGS_KEY = 'doc-gpt-settings';
  constructor() {
    //EMPTY
  }

  public getSettings(): UserSettings {
    const userSettings = localStorage.getItem(this.SETTINGS_KEY);
    return userSettings
      ? JSON.parse(userSettings)
      : { darkTheme: false, debug: false };
  }

  public setUserSettings(settings: UserSettings) {
    console.log(settings);
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  public getUser(): User | null {
    const userString = localStorage.getItem(this.KEY);
    return userString ? JSON.parse(userString) : null;
  }

  public setUser(user: User): void {
    localStorage.setItem(this.KEY, JSON.stringify(user));
  }

  public removeUser(): void {
    localStorage.removeItem(this.KEY);
  }
}
