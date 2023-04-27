import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSettings } from '../docgpt/api/user-settings';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private LIGHT_THEME = 'lara-light-blue';
  private DARK_THEME = 'lara-dark-blue';

  private _settings = new BehaviorSubject<UserSettings>({
    darkTheme: false,
    debug: false
  });

  constructor(
    private localStoreage: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const userSettings = this.localStoreage.getSettings();
    this._settings.next(userSettings);
    this.applyTheme(userSettings.darkTheme);
  }

  public getSettings(): Observable<UserSettings> {
    return this._settings.asObservable();
  }

  public toggleDebug() {
    const newSettings = {
      ...this._settings.value,
      debug: !this._settings.value.debug
    };
    this.localStoreage.setUserSettings(newSettings);
    this._settings.next(newSettings);
  }

  toggleTheme() {
    const newSettings = {
      ...this._settings.value,
      darkTheme: !this._settings.value.darkTheme
    };
    this.applyTheme(newSettings.darkTheme);

    this.localStoreage.setUserSettings(newSettings);
    this._settings.next(newSettings);
  }

  applyTheme(dark: boolean): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = dark
        ? this.DARK_THEME + '.css'
        : this.LIGHT_THEME + '.css';
    }
  }
}
