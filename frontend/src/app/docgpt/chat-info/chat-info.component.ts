import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextService } from '../services/context.service';
import { ChatType } from '../api/settings';
import { Models } from '../api/settings';
import { Languages } from '../api/settings';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  projectName: string | undefined;
  chatName: string | undefined;
  listenToDataChange!: Subscription;
  type!: string;
  model!: string;
  language!: string;
  constructor(private contexteService: ContextService) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contexteService
      .listenToDataChange()
      .subscribe((v) => {
        this.projectName = v[1]?.name;
        this.chatName = v[2]?.name;
        if (v[2]) {
          this.type = v[2]?.settings.type;
          this.model = v[2]?.settings.model;
          this.language = v[2]?.settings.language;
        }
      });
  }
  ngOnDestroy(): void {
    this.listenToDataChange.unsubscribe();
  }
}
