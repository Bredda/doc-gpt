import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
  currentProject = undefined;
  currentChat = undefined;
  paramsSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((paramMap) => {
      this.contextService.triggerContextChange(
        paramMap['projectId'],
        paramMap['chatId']
      );
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
