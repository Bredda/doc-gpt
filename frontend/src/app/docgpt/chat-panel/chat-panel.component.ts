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

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: Subscription[] = [];
  currentChat: Chat | undefined;
  queryProcessing: string | undefined;
  @ViewChild('target', { static: false })
  private myScrollContainer!: ElementRef;
  constructor(
    private chatService: ChatService,
    private contexteService: ContextService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.contexteService.listenToDataChange().subscribe((v) => {
        this.currentChat = v[2];
        window.scrollTo(0, document.body.scrollHeight);
      })
    );
    this.subscriptions.push(
      this.chatService.onQueryProcessingChange().subscribe((q) => {
        this.queryProcessing = q;
      })
    );
  }

  ngAfterViewInit(): void {
    this.myScrollContainer.nativeElement.scrollHeight({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
