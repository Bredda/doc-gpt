import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-no-chat',
  templateUrl: './no-chat.component.html',
  styleUrls: ['./no-chat.component.scss']
})
export class NoChatComponent {
  constructor(private ui: UiService) {}

  onCreateChat() {
    this.ui.triggerChatDiag();
  }
}
