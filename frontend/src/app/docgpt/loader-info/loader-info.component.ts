import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../api/project';
import { Chat } from '../api/chat';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-loader-info',
  templateUrl: './loader-info.component.html',
  styleUrls: ['./loader-info.component.scss']
})
export class LoaderInfoComponent implements OnInit{
  currentProject: Project |undefined = undefined
  currentChat: Chat |undefined = undefined
  constructor(private projectService: ProjectService, private chatService: ChatService, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.chatService.onCurrentChatChange().subscribe(c => this.currentChat = c)
    this.projectService.onCurrentProjectchange().subscribe(p => {
      this.currentProject = p
      console.log(p)
    } )
  }
}
