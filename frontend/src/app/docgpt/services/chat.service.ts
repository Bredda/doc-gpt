import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Project } from '../api/project';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../api/chat';
import { ProjectService } from './project.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000/doc-gpt';
  private currentChatId = undefined;
  private $currentChat = new BehaviorSubject<Chat | undefined>(undefined);
  private $queryBeingPrecessed = new BehaviorSubject<string | undefined>(
    undefined
  );
  constructor(
    private httpClient: HttpClient,
    private projectService: ProjectService,
    private navigationService: NavigationService
  ) {
    // On écoute la navigation pour déterminer si on a chargé un nouveau projet
    // Si c'est le cas, on update le currentProject directement depuis le back
    this.navigationService.onNavigationChange().subscribe((v) => {
      console.log('Navigation changrd to ', v);
      if (this.currentChatId !== v[1]) {
        this.currentChatId = v[1];
        if (v[1])
          this.getChatById(v[0], v[1]).subscribe((c) => {
            this.$currentChat.next(c);
          });
      }
    });
  }

  public onQueryProcessingChange(): Observable<string | undefined> {
    return this.$queryBeingPrecessed.asObservable();
  }

  public onCurrentChatChange(): Observable<Chat | undefined> {
    return this.$currentChat.asObservable();
  }

  public getChatById(projectId: string, chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(
      `${this.url}/projects/${projectId}/chats/${chatId}`
    );
  }

  public ask(chatId: string, query: string): Observable<Chat> {
    this.$queryBeingPrecessed.next(query);
    return this.httpClient
      .post<Chat>(`${this.url}/llm/ask`, { chatId: chatId, query: query })
      .pipe(
        tap(() => this.$queryBeingPrecessed.next(undefined)),
        tap((c) => this.$currentChat.next(c))
      );
  }

  public deleteChat(projectId: string, chatId: string): Observable<Project[]> {
    return this.httpClient
      .delete<Project[]>(`${this.url}/projects/${projectId}/chats/${chatId}`)
      .pipe(tap((p) => this.projectService.updateProjectList(p)));
  }

  public createNewChat(projectId: string, newChat: Partial<Chat>) {
    return this.httpClient
      .post<Project[]>(`${this.url}/projects/${projectId}/chats`, newChat)
      .pipe(tap((p) => this.projectService.updateProjectList(p)));
  }

  /**
   * OLD
   */

  public getChat(projectId: string, chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(
      `${this.url}/${projectId}/chats/${chatId}`
    );
  }

  public listenCurrentChat(): Observable<Chat | undefined> {
    return this.$currentChat.asObservable();
  }

  public triggerChatRefresh(projectId: string, chatId: string): void {
    this.getChat(projectId, chatId).subscribe((c) => this.$currentChat.next(c));
  }

  public loadChat(projectId: string, chatId: string): Observable<Chat> {
    return this.httpClient
      .get<Chat>(`${this.url}/${projectId}/chats/${chatId}`)
      .pipe(tap((c) => this.$currentChat.next(c)));
  }
}
