import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../api/project';
import { Chat } from '../api/chat';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader-info',
  templateUrl: './loader-info.component.html',
  styleUrls: ['./loader-info.component.scss']
})
export class LoaderInfoComponent implements OnInit, OnDestroy {
  private listenToDataChange!: Subscription;
  currentProject: Project | undefined = undefined;
  currentChat: Chat | undefined = undefined;
  constructor(private contextService: ContextService) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contextService
      .listenToDataChange()
      .subscribe((v) => {
        this.currentProject = v[1];
        this.currentChat = v[2];
      });
  }

  ngOnDestroy(): void {
    this.listenToDataChange.unsubscribe();
  }
}
