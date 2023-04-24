import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Chat } from '../api/chat';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';
import { LlmService } from '../services/llm.service';
import { UiService } from '../services/ui.service';
import { Project } from '../api/project';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  currentChat: Chat | undefined;
  currentProject: Project | undefined;
  queryProcessing = false;
  @ViewChild('target', { static: false })
  set viewChildReference(v: ElementRef) {
    console.log(v);
    if (v != undefined) {
      v.nativeElement.scroll({
        top: v.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  constructor(
    private chatService: ChatService,
    private contexteService: ContextService,
    private llm: LlmService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.contexteService.listenToDataChange().subscribe((v) => {
        this.currentChat = v[2];
        this.currentProject = v[1];
        window.scrollTo(0, document.body.scrollHeight);
      })
    );
    this.subscriptions.push(
      this.llm.listenToProcessing().subscribe((q) => {
        this.queryProcessing = q;
      })
    );
  }

  onCreateChat() {
    this.ui.triggerChatDiag();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
