import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-project-diag',
  templateUrl: './create-project-diag.component.html',
  styleUrls: ['./create-project-diag.component.scss'],
  providers: [MessageService]
})
export class CreateProjectDiagComponent implements OnInit, OnDestroy {
  newName = '';
  visible = false;
  sub!: Subscription;
  constructor(
    public projectService: ProjectService,
    public messageService: MessageService,
    private router: Router,
    public uiService: UiService
  ) {}

  ngOnInit(): void {
    this.sub = this.uiService
      .listenProjectDiagOpen()
      .subscribe((v) => (this.visible = true));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onCancelCreate() {
    this.visible = false;
    this.newName = '';
  }

  onConfirmCreate() {
    this.projectService.createNewProject(this.newName).subscribe((projects) => {
      this.newName = '';
      this.visible = false;
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Projet créé'
      });
      this.router.navigate(['project', projects[projects.length - 1].id]);
    });
  }
}
