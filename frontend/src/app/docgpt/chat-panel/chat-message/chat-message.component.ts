import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../api/chat';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  @Input()
  message!: ChatMessage;
  @Input()
  processing = false;
}
