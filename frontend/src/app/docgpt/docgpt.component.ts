import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from './services/context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-docgpt',
  templateUrl: './docgpt.component.html',
  styleUrls: ['./docgpt.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DocgptComponent implements OnInit, OnDestroy {
  private triggerContextChange!: Subscription;
  sidebarVisible = false;
  constructor(
    private route: ActivatedRoute,
    public contextService: ContextService
  ) {}

  ngOnInit(): void {
    /**
     * Listen to navigation between project and chat and trigger data update in context Service
     * All other components listen to this service
     */
    this.triggerContextChange = this.route.params.subscribe((paramMap) => {
      this.contextService.triggerContextChange(
        paramMap['projectId'],
        paramMap['chatId']
      );
    });
  }

  ngOnDestroy(): void {
    this.triggerContextChange.unsubscribe();
  }
}
