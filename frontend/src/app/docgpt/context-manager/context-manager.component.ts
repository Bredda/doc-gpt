import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';
import { ProjectService } from '../services/project.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-context-manager',
  templateUrl: './context-manager.component.html',
  styleUrls: ['./context-manager.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ContextManagerComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl!: ElementRef;
  uploadedFiles: any[] = [];
  files: TreeNode[] = [];
  items: MenuItem[] = [
    {
      label: 'Renommer',
      icon: 'pi pi-fw pi-pencil'
    },
    {
      label: 'Visualiser',
      icon: 'pi pi-fw pi-pencil'
    },
    {
      label: 'Supprimer',
      icon: 'pi pi-fw pi-pencil'
    }
  ];
  currentProject: number | undefined = undefined;
  constructor(
    private contextService: ContextService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contextService.listenCurrentProjectContext().subscribe((c) => {
      const newContext: MenuItem[] = [];
      c.forEach((f) => {
        newContext.push({ id: f.id, label: f.originalname });
      });
      this.files = newContext;
    });
    this.route.params.subscribe((paramMap) => {
      this.currentProject = paramMap['projectId'];
      if (this.currentProject !== undefined) {
        this.contextService
          .getProjectContext(this.currentProject)
          .subscribe((c) => {
            const newContext: MenuItem[] = [];
            c.forEach((f) => {
              newContext.push({ id: f.id, label: f.originalname });
            });
            this.files = newContext;
          });
      }
    });
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    const files = Array.from($event as ArrayLike<File>);
    this.confirmationService.confirm({
      message: `Vous êtes sur le point d'ajouter ${files.length} document(s), souhaitez-vous continuer ?`,
      header: 'Ajout de documents',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Uploader',
      rejectLabel: 'Annuler',
      accept: () => {
        this.contextService.uploadFiles(this.currentProject, files);
      },
      reject: (type: ConfirmEventType) => {}
    });
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    const files = Array.from(event.target.files as ArrayLike<File>);
    console.log(event);
    console.log(files);
  }
}
