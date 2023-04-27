import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _openCreateChatDiag = new Subject<boolean>();
  private _displayDocument = new Subject<string>();
  constructor() {}

  public triggerChatDiag() {
    this._openCreateChatDiag.next(true);
  }

  public listenChatDiagOpen(): Observable<boolean> {
    return this._openCreateChatDiag.asObservable();
  }

  public listenDocumentDisplay(): Observable<string> {
    return this._displayDocument.asObservable();
  }

  public displayDocument(docId: string) {
    this._displayDocument.next(docId);
  }

  public hideDocument() {
    this._displayDocument.next('');
  }
}
