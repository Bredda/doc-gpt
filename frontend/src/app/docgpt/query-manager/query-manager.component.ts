import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';
import { Chat } from '../api/chat';
import { LlmService } from '../services/llm.service';

@Component({
  selector: 'app-query-manager',
  templateUrl: './query-manager.component.html',
  styleUrls: ['./query-manager.component.scss']
})
export class QueryManagerComponent implements OnInit, OnDestroy {
  listenToDataChange!: Subscription;
  query = '';
  currentChat!: Chat | undefined;
  constructor(private contextService: ContextService, public llm: LlmService) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contextService
      .listenToDataChange()
      .subscribe((v) => (this.currentChat = v[2]));
  }

  onAsk() {
    if (this.currentChat !== undefined) {
      if (this.currentChat.settings.type === 'conversationnal') {
        this.llm.query(this.currentChat.id, this.query);
      }
      if (this.currentChat.settings.type === 'chat_with_data') {
        this.llm.queryRetrieval(this.query);
      }
      this.query = '';
    }
  }

  askFromKeydown(event: any) {
    event.preventDefault();
    this.onAsk();
  }

  ngOnDestroy(): void {
    this.listenToDataChange.unsubscribe();
  }
}
