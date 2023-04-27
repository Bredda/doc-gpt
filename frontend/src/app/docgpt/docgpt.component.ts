import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
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
  currentProject!: string;
  private subscriptions: Subscription[] = [];
  sidebarVisible = false;
  constructor(
    private route: ActivatedRoute,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((paramMap) => {
        this.currentProject = paramMap['projectId'];
        this.contextService.triggerContextChange(
          paramMap['projectId'],
          paramMap['chatId']
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
