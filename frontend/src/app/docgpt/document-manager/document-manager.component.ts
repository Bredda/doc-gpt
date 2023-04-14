import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';
import { DocumentService } from '../services/documents.service';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DocumentManagerComponent implements OnInit {
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
  currentProject: string | undefined = undefined;
  constructor(
    private contextService: ContextService,
    private documentService: DocumentService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.files = this.transformDocsToTreeNode(v[3]);
      this.currentProject = v[1]?.id;
    });
  }

  private transformDocsToTreeNode(documents: any[]) {
    console.log('Transform docs', documents);
    const newContext: MenuItem[] = [];
    documents.forEach((f) => {
      newContext.push({ id: f.id, label: f.originalname });
    });
    return newContext;
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
        this.documentService.uploadFiles(this.currentProject, files);
      }
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
