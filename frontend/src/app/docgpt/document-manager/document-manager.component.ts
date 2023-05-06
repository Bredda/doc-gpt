import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';

import { DocumentService, ContextService, UiService } from '../services/index';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DocumentManagerComponent implements OnInit {
  uploadDiagVisible = false;
  uploadedFiles: any[] = [];
  files: TreeNode[] = [];
  selectedNode!: TreeNode;
  items: MenuItem[] = [
    {
      label: 'Renommer',
      icon: 'pi pi-fw pi-pencil'
    },
    {
      label: 'Visualiser',
      icon: 'pi pi-fw pi-pencil',
      command: () => this.openDocument()
    },
    {
      label: 'Supprimer',
      icon: 'pi pi-fw pi-pencil',
      command: () => this.deleteDocument()
    }
  ];
  currentProject: string | undefined = undefined;
  currentProjectName!: string;
  debugOn = false;
  embeddingsUrl = '';
  constructor(
    private contextService: ContextService,
    private documentService: DocumentService,
    private messageService: MessageService,
    private settings: SettingsService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.files = this.transformDocsToTreeNode(v[3]);
      this.currentProject = v[1]?.id;
      this.currentProjectName = v[1]?.name || '';
      this.embeddingsUrl = `http://localhost:4202/#http://127.0.0.1:8123/#default#embeddings#1%3D1%20AND%20collection_uuid%20%3D%20'${this.currentProject}'`;
    });
    this.settings.getSettings().subscribe((s) => (this.debugOn = s.debug));
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

  openDocument() {
    this.uiService.displayDocument(this.selectedNode.data);
  }

  onDroppedFiles(files: any[]) {
    this.uploadedFiles = files;
  }
}
