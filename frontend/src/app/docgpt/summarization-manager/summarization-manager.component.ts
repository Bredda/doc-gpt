import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '../api';
import { ContextService, LlmService } from '../services';

@Component({
  selector: 'app-summarization-manager',
  templateUrl: './summarization-manager.component.html',
  styleUrls: ['./summarization-manager.component.scss']
})
export class SummarizationManagerComponent implements OnInit, OnDestroy {
  documents: any[] = [];
  selectedDocument: any;
  processing = false;
  done = false;
  constructor(
    private contextService: ContextService,
    private llm: LlmService
  ) {}
  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.documents = v[3];
    });
    this.llm.listenToProcessing().subscribe((v) => (this.processing = v));
  }
  ngOnDestroy(): void {}

  onSummarize(): void {
    this.done = true;
    this.llm.querySummarization(this.selectedDocument.id);
  }
}
