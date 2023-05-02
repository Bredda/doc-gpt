import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { Project } from '../api/project';
import { Chat } from '../api/chat';
import { ProjectService } from './project.service';
import { ChatService } from './chat.service';
import { DocumentService } from './documents.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  public currentChatId: string | undefined;
  public currentProjectId: string | undefined;

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

  public hasCurrentChat(): Observable<boolean> {
    return combineLatest([
      this.hasCurrentProject(),
      this.chatService.currentChat
    ]).pipe(map(([p, c]) => p && c !== undefined));
  }

  public hasProjectButNoChat(): Observable<boolean> {
    return combineLatest([
      this.hasCurrentProject(),
      this.hasCurrentChat()
    ]).pipe(map(([p, c]) => p && !c));
  }

  public hasCurrentProject(): Observable<boolean> {
    return this.projectService.currentProject.pipe(map((c) => c !== undefined));
  }

  public hasNoProjectNoChat(): Observable<boolean> {
    return combineLatest([
      this.hasCurrentProject(),
      this.hasCurrentChat()
    ]).pipe(map(([p, c]) => !p && !c));
  }

  public currentChatIsSummary(): Observable<boolean> {
    return this.chatService.currentChat.pipe(
      map((c) => c?.settings.type === 'summarization')
    );
  }

  public currentProjectHasDocuments(): Observable<boolean> {
    return this.documentService
      .getCurrentProjectContext()
      .pipe(map((d) => d.length > 0));
  }

  public currentChatIsChat(): Observable<boolean> {
    return this.chatService.currentChat.pipe(
      map((c) => c?.settings.type !== 'summarization')
    );
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
