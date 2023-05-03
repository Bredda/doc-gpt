import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Project } from '../api/project';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../api/chat';
import { ProjectService } from './project.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = `${environment.API_URL}/doc-gpt`;
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

  public addTempNewqueryToCurrentChat(query: string) {
    const oldChat = this.currentChat.value;
    if (oldChat !== undefined) {
      oldChat?.messages.push({ id: '', content: query, origin: 'user' });
      this.updateCurrentChat(oldChat);
    }
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
