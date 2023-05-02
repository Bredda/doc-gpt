import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Chat } from '../api/chat';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';
import { LlmService } from '../services/llm.service';
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
    if (v != undefined) {
      v.nativeElement.scroll({
        top: v.nativeElement.scrollHeight + 200,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  constructor(
    private contexteService: ContextService,
    private llm: LlmService
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
