import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Chat } from '../api/chat';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {

  currentChat: Chat | undefined = undefined
  queryProcessing: string | undefined = undefined;
  constructor(private chatService: ChatService, private navigationService: NavigationService) {
    this.chatService.onCurrentChatChange().subscribe(c => this.currentChat = c)
  }

  ngOnInit(): void {
    this.chatService.onCurrentChatChange().subscribe(c => {
      this.currentChat = c
      console.log(c)
    })
    this.chatService.onQueryProcessingChange().subscribe(q => {
      this.queryProcessing = q
    })
  }

}
