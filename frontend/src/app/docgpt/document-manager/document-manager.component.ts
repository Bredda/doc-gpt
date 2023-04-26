import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';
import { DocumentService } from '../services/documents.service';
import { ContextService } from '../services/context.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DocumentManagerComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUploadEl!: FileUpload;
  uploadDiagVisible = false;
  uploadedFiles: any[] = [];
  files: TreeNode[] = [];
  progress = 0;
  onProgress = false;
  uploadDone = false;
  selectedNode!: TreeNode;
  uploadUrl = '';
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
      icon: 'pi pi-fw pi-pencil',
      command: () => this.deleteDocument()
    }
  ];
  currentProject: string | undefined = undefined;
  currentProjectName!: string;
  constructor(
    private contextService: ContextService,
    private documentService: DocumentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.files = this.transformDocsToTreeNode(v[3]);
      this.currentProject = v[1]?.id;
      this.currentProjectName = v[1]?.name || '';
      this.uploadUrl = `http://localhost:3000/doc-gpt/projects/${this.currentProject}/documents`;
    });
  }

  private transformDocsToTreeNode(documents: any[]) {
    const newContext: TreeNode[] = [];
    documents.forEach((f) => {
      newContext.push({ label: f.originalname, data: f });
    });
    return newContext;
  }

  deleteDocument() {
    if (this.currentProject) {
      this.documentService
        .deleteFile(this.currentProject, this.selectedNode.data.id)
        .subscribe(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Document supprimé: ${this.selectedNode.label}`
          })
        );
    }
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.uploadedFiles = Array.from($event as ArrayLike<File>);
    this.uploadedFiles.map((f) => {
      return { ...f, done: false };
    });
    this.uploadDiagVisible = true;
  }

  onUploadConfirm() {
    this.onProgress = true;
    let nbFileDone = 0;
    this.progress = 1;
    for (const f of this.uploadedFiles) {
      this.documentService.uploadFile(this.currentProject, f).subscribe(() => {
        console.log('upload done');
        nbFileDone = nbFileDone + 1;
        this.progress = Math.round(
          (nbFileDone / this.uploadedFiles.length) * 100
        );
        this.onProgress = this.progress !== 100;
        f.done = true;
      });
    }
  }

  closeUploadDiag() {
    this.uploadDiagVisible = false;
    this.progress = 0;
    this.onProgress = false;
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
