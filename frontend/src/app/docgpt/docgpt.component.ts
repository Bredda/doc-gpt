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
  currentProject = undefined;
  currentChat = undefined;
  private subscriptions: Subscription[] = [];
  paramsSubscription!: Subscription;
  @ViewChild('target', { static: false })
  set viewChildReference(v: ElementRef) {
    console.log(v);
    if (v !== undefined) {
      v.nativeElement.scroll({
        top: v.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  constructor(
    private route: ActivatedRoute,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((paramMap) => {
        this.contextService.triggerContextChange(
          paramMap['projectId'],
          paramMap['chatId']
        );
      })
    );
    this.subscriptions.push(
      this.contextService.listenToDataChange().subscribe((v) => {
        window.scrollTo(0, document.body.scrollHeight);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
