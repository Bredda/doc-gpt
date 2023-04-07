import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NavigationService } from '../services/navigation.service';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';
import { Chat } from '../api/chat';

@Component({
  selector: 'app-query-manager',
  templateUrl: './query-manager.component.html',
  styleUrls: ['./query-manager.component.scss']
})
export class QueryManagerComponent implements OnInit {
  listenToDataChange!: Subscription;
  query = '';
  currentChat: Chat | undefined;

  constructor(
    private chatService: ChatService,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contextService
      .listenToDataChange()
      .subscribe((v) => (this.currentChat = v[2]));
  }

  onAsk() {
    if (this.currentChat !== undefined) {
      this.chatService.ask(this.currentChat.id, this.query).subscribe();
    }
  }
}
