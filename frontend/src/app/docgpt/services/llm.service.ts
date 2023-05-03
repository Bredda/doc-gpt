import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { ContextService } from './context.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  socket!: Socket;
  private $queryBeingPrecessed = new BehaviorSubject<boolean>(false);
  constructor(
    private chatService: ChatService,
    private contextService: ContextService
  ) {
    this.socket = io(environment.API_URL, {
      autoConnect: true,
      reconnection: true
    });
  }

  listenToProcessing(): Observable<boolean> {
    return this.$queryBeingPrecessed.asObservable();
  }

  queryRetrieval(query: string) {
    this.chatService.addTempNewqueryToCurrentChat(query);
    this.$queryBeingPrecessed.next(true);
    console.log(query);
    this.socket.emit('retrieval-query', {
      projectId: this.contextService.currentProjectId,
      chatId: this.contextService.currentChatId,
      query: query
    });
    this.socket.on('retrieval-response', (resp) => {
      this.chatService.updateCurrentChat(resp);
      this.$queryBeingPrecessed.next(false);
    });
  }

  query(chatId: string, query: string) {
    this.chatService.addTempNewqueryToCurrentChat(query);
    this.$queryBeingPrecessed.next(true);
    console.log(chatId);
    console.log(query);
    this.socket.emit('conversation-query', { chatId: chatId, query: query });
    this.socket.on('conversation-response', (resp) => {
      this.chatService.updateCurrentChat(resp);
      this.$queryBeingPrecessed.next(false);
    });
  }
}
