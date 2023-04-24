import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _openCreateChatDiag = new Subject<boolean>();

  constructor() {}

  public triggerChatDiag() {
    this._openCreateChatDiag.next(true);
  }

  public listenChatDiagOpen(): Observable<boolean> {
    return this._openCreateChatDiag.asObservable();
  }
}
