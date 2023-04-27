import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  private _debug = new BehaviorSubject<boolean>(false);

  constructor(private localStoreage: LocalStorageService) {}

  public toggleDebug() {
    this._debug.next(!this._debug.value);
    this.localStoreage.setUserSettings({
      ...this.localStoreage.getSettings(),
      debug: this._debug.value
    });
  }

  public debug(): Observable<boolean> {
    return this._debug.asObservable();
  }
  public currentDebug(): boolean {
    return this._debug.value;
  }
}
