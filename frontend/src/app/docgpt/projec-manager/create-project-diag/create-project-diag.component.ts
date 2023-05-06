import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project-diag',
  templateUrl: './create-project-diag.component.html',
  styleUrls: ['./create-project-diag.component.scss'],
  providers: [MessageService]
})
export class CreateProjectDiagComponent {
  @Input()
  visible = false;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  projectForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  onCancelCreate() {
    this.visibleChange.emit(false);
    this.projectForm.reset();
  }
  onConfirmCreate() {
    const ctrl = this.projectForm.get('name');
    if (ctrl && ctrl.value) {
      this.projectService.createNewProject(ctrl.value).subscribe((projects) => {
        this.projectForm.reset();
        this.visibleChange.emit(false);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Projet créé'
        });
        this.router.navigate(['project', projects[projects.length - 1].id]);
      });
    }
  }
}
