import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  $projectId = new BehaviorSubject<number | undefined>(undefined);
  $chatId = new BehaviorSubject<number | undefined>(undefined);
  constructor(private router: Router, private route: ActivatedRoute) {}

  public alertProjectHasChanged(projectId: number | undefined) {
    this.$projectId.next(projectId);
  }

  public alertChatHasChanged(chatId: number | undefined) {
    this.$chatId.next(chatId);
  }

  public onNavigationChange(): Observable<any> {
    return combineLatest([this.$projectId, this.$chatId]);
  }

  public onChatChange(): Observable<number | undefined> {
    return this.$chatId.asObservable();
  }

  public getCurrentChatId(): number | undefined {
    return this.$chatId.value;
  }

  public onProjectChange(): Observable<number | undefined> {
    return this.$projectId.asObservable();
  }
  public getCurrentProjectId(): number | undefined {
    return this.$projectId.value;
  }
}
