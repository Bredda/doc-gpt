import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Languages,
  Models,
  GROUPED_CHAT_TYPE,
  ChatType
} from '../../api/settings';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChatService } from '../../services/chat.service';
import { ContextService } from '../../services/context.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-chat-diag',
  templateUrl: './create-chat-diag.component.html',
  styleUrls: ['./create-chat-diag.component.scss'],
  providers: [MessageService]
})
export class CreateChatDiagComponent implements OnInit, OnDestroy {
  visible = false;
  languages = Languages;
  selectedLanguage = Languages[0];
  selectedModel = Models[0];
  models = Models;
  types = GROUPED_CHAT_TYPE;
  selectedType = ChatType[0];
  projectFiles: any[] = [];
  selectedFiles: any[] = [];
  newName = '';
  sub!: Subscription;
  constructor(
    private router: Router,
    private chatService: ChatService,
    private messageService: MessageService,
    private contextService: ContextService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.sub = this.uiService
      .listenChatDiagOpen()
      .subscribe((v) => (this.visible = true));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onCancelCreateChat() {
    this.visible = false;
  }
  onConfirmCreateChat() {
    this.chatService
      .createNewChat(this.contextService.currentProjectId || '', {
        docIds: this.selectedFiles.map((d) => d.value),
        settings: {
          type: this.selectedType.value,
          model: this.selectedModel.name,
          language: this.selectedLanguage.value
        },
        name: this.newName
      })
      .subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Nouvelle conversation créée'
        });

        const created = this.chatService.lastCreatedChat;
        this.router.navigate([
          'project',
          created.projectId,
          'chat',
          created.chatId
        ]);
      });
  }
}
