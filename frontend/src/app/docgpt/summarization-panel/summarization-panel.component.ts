import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContextService, LlmService } from '../services';
import { Chat } from '../api';

@Component({
  selector: 'app-summarization-panel',
  templateUrl: './summarization-panel.component.html',
  styleUrls: ['./summarization-panel.component.scss']
})
export class SummarizationPanelComponent implements OnInit, OnDestroy {
  currentChat: Chat | undefined;
  processing = false;
  constructor(
    private contextService: ContextService,
    private llm: LlmService
  ) {}
  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.currentChat = v[2];
    });
    this.llm.listenToProcessing().subscribe((v) => (this.processing = v));
  }
  ngOnDestroy(): void {}
}
