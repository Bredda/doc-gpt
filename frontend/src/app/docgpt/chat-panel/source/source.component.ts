import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../api/chat';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent {
  @Input()
  message!: ChatMessage;
}
