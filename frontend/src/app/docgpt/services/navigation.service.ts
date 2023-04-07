import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  $projectId = new BehaviorSubject<string | undefined>(undefined);
  $chatId = new BehaviorSubject<string | undefined>(undefined);
  constructor() {}

  public alertProjectHasChanged(projectId: string | undefined) {
    this.$projectId.next(projectId);
  }

  public alertChatHasChanged(chatId: string | undefined) {
    this.$chatId.next(chatId);
  }

  public onNavigationChange(): Observable<any> {
    return combineLatest([this.$projectId, this.$chatId]);
  }

  public onChatChange(): Observable<string | undefined> {
    return this.$chatId.asObservable();
  }

  public getCurrentChatId(): string | undefined {
    return this.$chatId.value;
  }

  public onProjectChange(): Observable<string | undefined> {
    return this.$projectId.asObservable();
  }
  public getCurrentProjectId(): string | undefined {
    return this.$projectId.value;
  }
}
