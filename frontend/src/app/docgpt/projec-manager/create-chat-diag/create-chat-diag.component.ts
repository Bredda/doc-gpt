import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatType, Languages, Models, Setting } from '../../api/settings';
import { ChatService, UiService } from '../../services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-chat-diag',
  templateUrl: './create-chat-diag.component.html',
  styleUrls: ['./create-chat-diag.component.scss'],
  providers: [MessageService]
})
export class CreateChatDiagComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  targetProjectId!: string;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  types = ChatType;
  languages = Languages;
  models = Models;

  chatForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    language: new FormControl<Setting>(Languages[0], Validators.required),
    model: new FormControl<Setting>(Models[0], Validators.required),
    type: new FormControl<Setting>(ChatType[0], Validators.required)
  });

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.uiService
      .listenChatDiagOpen()
      .subscribe((v) => this.visibleChange.emit(true));
  }

  onCancelCreateChat() {
    this.visibleChange.emit(false);
    this.chatForm.reset();
  }
  onConfirmCreateChat() {
    this.chatService
      .createNewChat(this.targetProjectId, {
        name: this.chatForm.value.name || '',
        settings: {
          type: this.chatForm.value.type?.code,
          model: this.chatForm.value.model?.code,
          language: this.chatForm.value.language?.code
        }
      })
      .subscribe((projects) => {
        this.chatForm.reset();
        this.visibleChange.emit(false);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Nouvelle conversation créée'
        });

        const targetProject = projects.find(
          (p) => p.id === this.targetProjectId
        );
        if (targetProject !== undefined) {
          const targetChat =
            targetProject.chats[targetProject.chats.length - 1];
          this.router.navigate([
            'project',
            targetProject.id,
            'chat',
            targetChat.id
          ]);
        }
      });
  }
}
