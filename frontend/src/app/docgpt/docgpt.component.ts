import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from './services/context.service';
import { LlmService } from './services/llm.service';

@Component({
  selector: 'app-docgpt',
  templateUrl: './docgpt.component.html',
  styleUrls: ['./docgpt.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DocgptComponent implements OnInit {
  currentProject = undefined;
  currentChat = undefined;

  constructor(
    private route: ActivatedRoute,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((paramMap) => {
      this.contextService.triggerContextChange(
        paramMap['projectId'],
        paramMap['chatId']
      );
    });
  }
}
