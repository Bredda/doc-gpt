import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Chat } from '../api/chat';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  currentChat: Chat | undefined;
  queryProcessing: string | undefined;

  constructor(
    private chatService: ChatService,
    private contexteService: ContextService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.contexteService
        .listenToDataChange()
        .subscribe((v) => (this.currentChat = v[2]))
    );
    this.subscriptions.push(
      this.chatService.onQueryProcessingChange().subscribe((q) => {
        this.queryProcessing = q;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
