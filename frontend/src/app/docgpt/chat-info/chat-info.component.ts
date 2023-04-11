import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  projectName: string | undefined;
  chatName: string | undefined;
  listenToDataChange!: Subscription;

  constructor(private contexteService: ContextService) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contexteService
      .listenToDataChange()
      .subscribe((v) => {
        this.projectName = v[1]?.name;
        this.chatName = v[2]?.name;
      });
  }
  ngOnDestroy(): void {
    this.listenToDataChange.unsubscribe();
  }
}
