import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../api/chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input()
  message!: ChatMessage;
  @Input()
  processing: boolean = false;
}
