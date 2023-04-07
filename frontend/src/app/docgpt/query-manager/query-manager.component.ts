import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-query-manager',
  templateUrl: './query-manager.component.html',
  styleUrls: ['./query-manager.component.scss']
})
export class QueryManagerComponent implements OnInit {
  query = '';
  currentChatId: string | undefined = undefined;

  constructor(
    private chatService: ChatService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.navigationService
      .onChatChange()
      .subscribe((id) => (this.currentChatId = id));
  }

  onAsk() {
    if (this.currentChatId !== undefined) {
      this.chatService.ask(this.currentChatId, this.query).subscribe();
    }
  }
}
