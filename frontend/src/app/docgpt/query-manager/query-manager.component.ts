import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';
import { Chat } from '../api/chat';
import { LlmService } from '../services/llm.service';

@Component({
  selector: 'app-query-manager',
  templateUrl: './query-manager.component.html',
  styleUrls: ['./query-manager.component.scss']
})
export class QueryManagerComponent implements OnInit {
  listenToDataChange!: Subscription;
  query = '';
  currentChat: Chat | undefined;
  loading = false;
  constructor(
    private chatService: ChatService,
    private contextService: ContextService,
    private llm: LlmService
  ) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contextService
      .listenToDataChange()
      .subscribe((v) => (this.currentChat = v[2]));
    this.llm
      .listenToProcessing()
      .subscribe((processing) => (this.loading = processing));
  }

  onAsk() {
    console.log(this.currentChat);
    if (this.currentChat !== undefined) {
      if (this.currentChat.settings.type === 'conversationnal') {
        this.llm.query(this.currentChat.id, this.query);
      }
      if (this.currentChat.settings.type === 'chat_with_data') {
        this.llm.queryRetrieval('', this.currentChat.id, this.query);
      }
      this.query = '';
    }
  }

  askFromKeydown(event: any) {
    event.preventDefault();
    this.onAsk();
  }
}
