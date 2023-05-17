import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rename-project-dialog',
  templateUrl: './rename-project-dialog.component.html',
  styleUrls: ['./rename-project-dialog.component.css']
})
export class RenameProjectDialogComponent  implements OnInit {
  @Input()
  visible = false;
  @Input()
  targetProjectId!: string;
  @Input()
  projectName!:string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  projectForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required])
  });
  constructor(    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router
) {}
  ngOnInit(): void {
    }

 
  onRenameProject(){
    const ctrl = this.projectForm.get('name');
    if (ctrl && ctrl.value) {
      this.projectService.renameProject(this.targetProjectId,ctrl.value).subscribe((projects) => {
        this.projectForm.reset();
        this.visibleChange.emit(false);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Projet renomé'
        });
        this.router.navigate(['project', this.targetProjectId]);
      });
    }
    
  }

  onCancelCreate() {
    this.visibleChange.emit(false);
    this.projectForm.reset();
  }
}
