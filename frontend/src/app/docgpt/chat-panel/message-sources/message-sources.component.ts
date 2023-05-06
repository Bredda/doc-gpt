import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../api/chat';

@Component({
  selector: 'app-message-sources',
  templateUrl: './message-sources.component.html',
  styleUrls: ['./message-sources.component.scss']
})
export class MessageSourcesComponent {
  @Input()
  message!: ChatMessage;
}
