import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, tap } from 'rxjs';
import { Project } from '../api/project';
import { Chat } from '../api/chat';
import { ProjectService } from './project.service';
import { ChatService } from './chat.service';
import { DocumentService } from './documents.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private currentDocuments = new BehaviorSubject<any[]>([]);
  private currentChatId: string | undefined;
  private currentProjectId: string | undefined;
  constructor(
    private projectService: ProjectService,
    private chatService: ChatService,
    private documentService: DocumentService
  ) {}

  /**
   * Triggers data refresh from backend based on projectId and chatId. BAsed on actual changes,
   * it may refresh Projects list and currently displayed Chat details
   * @param projectId
   * @param chatId
   */
  public triggerContextChange(projectId: string, chatId: string) {
    if (projectId !== this.currentProjectId || projectId === undefined) {
      this.currentProjectId = projectId;
      this.triggerProjectListRefresh(projectId);
      if (projectId !== undefined) this.triggerDocumentListRefresh(projectId);
    }
    if (chatId !== this.currentChatId) {
      this.currentChatId = chatId;
      this.triggerChatDetailRefresh(projectId, chatId);
    }
  }

  /**
   * Subscription to latest data from backend. Subscription is an 4-dimensionnal array with:
   * 1. List of all projects with their (light) chats associated
   * 2. Currently displayed project
   * 3. Currently (detailled) displayed chat
   * 4. List of documents for the currently displayed project
   * @returns
   */
  public listenToDataChange(): Observable<
    [Project[], Project | undefined, Chat | undefined, any[]]
  > {
    return combineLatest([
      this.projectService.currentProjecChatList,
      this.projectService.currentProject,
      this.chatService.currentChat,
      this.documentService.documents
    ]);
  }

  /**
   * Subscription to the latest projects mlist from backend
   * @returns
   */
  public listenProjectList(): Observable<Project[]> {
    return this.projectService.currentProjecChatList.asObservable();
  }
  /**
   * Subscription to the currently displayed Chat data
   * @returns
   */
  public listenCurrentChat(): Observable<Chat | undefined> {
    return this.chatService.currentChat.asObservable();
  }
  /**
   * Subscription to the currently displayed Project data
   * @returns
   */
  public listenCurrentProject(): Observable<Project | undefined> {
    return this.projectService.currentProject.asObservable();
  }
  /**
   * Trigger a backend data refresh for the currently displayed Chat
   * @param projectId
   * @param chatId
   */
  public triggerChatDetailRefresh(projectId: string, chatId: string): void {
    if (chatId !== undefined && projectId !== undefined)
      this.chatService
        .getChatById(projectId, chatId)
        .pipe(tap((c) => this.chatService.currentChat.next(c)))
        .subscribe();
    else this.chatService.currentChat.next(undefined);
  }
  /**
   * Trigger a backend data refresh for the Project list
   * @param projectId
   * @param chatId
   */
  public triggerProjectListRefresh(projectId: string): void {
    this.projectService
      .getProjects()
      .pipe(
        tap((projects) =>
          this.projectService.currentProjecChatList.next(projects)
        )
      )
      .pipe(
        tap((projects) => {
          const targetProject = projects.find((p) => p.id === projectId);
          this.projectService.currentProject.next(targetProject);
        })
      )
      .subscribe();
  }

  public triggerDocumentListRefresh(projectId: string): void {
    this.documentService
      .getProjectDocuments(projectId)
      .pipe(tap((d) => this.documentService.documents.next(d)))
      .subscribe();
  }
}
