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
    language: new FormControl<string>(Languages[0].code, Validators.required),
    model: new FormControl<string>(Models[0].code, Validators.required),
    type: new FormControl<string>(ChatType[0].code, Validators.required)
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
    this.chatForm.valueChanges.subscribe((v) => console.log(v));
  }

  onCancelCreateChat() {
    this.visibleChange.emit(false);
    this.chatForm.reset();
  }

  onConfirmCreateChat() {
    console.log(this.chatForm.value);
    this.chatService
      .createNewChat(this.targetProjectId, {
        name: this.chatForm.value.name || '',
        settings: {
          type: this.chatForm.value.type,
          model: this.chatForm.value.model,
          language: this.chatForm.value.language
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
