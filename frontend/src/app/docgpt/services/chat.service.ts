import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Project } from '../api/project';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../api/chat';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000/doc-gpt';
  public currentChat = new BehaviorSubject<Chat | undefined>(undefined);
  private $queryBeingPrecessed = new BehaviorSubject<string | undefined>(
    undefined
  );
  constructor(
    private httpClient: HttpClient,
    private projectService: ProjectService
  ) {}

  public onQueryProcessingChange(): Observable<string | undefined> {
    return this.$queryBeingPrecessed.asObservable();
  }

  public getChatById(projectId: string, chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(
      `${this.url}/projects/${projectId}/chats/${chatId}`
    );
  }
  public updateCurrentChat(chat: Chat) {
    this.currentChat.next(chat);
  }
  public ask(chatId: string, query: string): Observable<Chat> {
    this.$queryBeingPrecessed.next(query);
    return this.httpClient
      .post<Chat>(`${this.url}/llm/ask`, { chatId: chatId, query: query })
      .pipe(
        tap(() => this.$queryBeingPrecessed.next(undefined)),
        tap((c) => this.updateCurrentChat(c))
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
}
