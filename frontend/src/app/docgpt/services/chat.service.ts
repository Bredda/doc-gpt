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

  public lastCreatedChat = { projectId: '', chatId: '' };
  constructor(
    private httpClient: HttpClient,
    private projectService: ProjectService
  ) {}

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

  public deleteChat(projectId: string, chatId: string): Observable<Project[]> {
    return this.httpClient
      .delete<Project[]>(`${this.url}/projects/${projectId}/chats/${chatId}`)
      .pipe(tap((p) => this.projectService.updateProjectList(p)));
  }

  public createNewChat(projectId: string, newChat: Partial<Chat>) {
    return this.httpClient
      .post<Project[]>(`${this.url}/projects/${projectId}/chats`, newChat)
      .pipe(
        tap((p) => this.projectService.updateProjectList(p)),
        tap((projects) => {
          const targetProject = projects.find((p) => p.id === projectId);
          const targetChat =
            targetProject?.chats[targetProject?.chats.length - 1];
          if (targetChat)
            this.lastCreatedChat = {
              projectId: projectId,
              chatId: targetChat.id
            };
        })
      );
  }
}
