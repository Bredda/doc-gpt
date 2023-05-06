import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Chat, Project } from '../api/index';
import { LlmService, ContextService, UiService } from '../services/index';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit, OnDestroy {
  listenToDataChange!: Subscription;
  currentChat: Chat | undefined;
  currentProject: Project | undefined;
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
    public llm: LlmService,
    public ui: UiService
  ) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contexteService
      .listenToDataChange()
      .subscribe((v) => {
        this.currentChat = v[2];
        this.currentProject = v[1];
        window.scrollTo(0, document.body.scrollHeight);
      });
  }

  ngOnDestroy(): void {
    this.listenToDataChange.unsubscribe();
  }
}
