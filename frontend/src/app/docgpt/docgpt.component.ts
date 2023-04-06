import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from './services/navigation.service';

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
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((paramMap) => {
      this.navigationService.alertProjectHasChanged(paramMap['projectId']);
      this.navigationService.alertChatHasChanged(paramMap['chatId']);
    });
  }
}
