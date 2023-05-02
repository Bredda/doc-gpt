import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _openCreateChatDiag = new Subject<boolean>();
  private _openCreateProjectDiag = new Subject<boolean>();
  private _displayDocument = new Subject<any>();
  constructor() {}

  public triggerChatDiag() {
    this._openCreateChatDiag.next(true);
  }

  public triggerProjectDiag() {
    console.log('Tigger diag open');
    this._openCreateProjectDiag.next(true);
  }

  public listenProjectDiagOpen(): Observable<boolean> {
    return this._openCreateProjectDiag.asObservable();
  }

  public listenChatDiagOpen(): Observable<boolean> {
    return this._openCreateChatDiag.asObservable();
  }

  public listenDocumentDisplay(): Observable<any> {
    return this._displayDocument.asObservable();
  }

  public displayDocument(doc: any) {
    this._displayDocument.next(doc);
  }

  public hideDocument() {
    this._displayDocument.next(undefined);
  }
}
