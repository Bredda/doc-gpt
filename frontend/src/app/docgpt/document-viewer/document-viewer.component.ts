import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { DocumentService } from '../services/documents.service';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  sidebarVisible = false;
  content = '';
  url = '';
  constructor(
    private uiService: UiService,
    private docService: DocumentService,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.uiService.listenDocumentDisplay().subscribe((doc: any) => {
      const currentProjectId = this.contextService.currentProjectId;
      if (doc !== '' && currentProjectId !== undefined) {
        switch (doc.mimetype) {
          case 'text/plain':
            this.docService
              .getUploadedDocContent(currentProjectId, doc.id)
              .subscribe((c) => (this.content = c));
            break;
          case 'application/pdf':
            this.url = this.docService.getUploadedDocUrl(
              currentProjectId,
              doc.id
            );

            break;
          default:
            break;
        }
        this.sidebarVisible = doc !== undefined;
      }
    });
  }

  onHide() {
    this.sidebarVisible = false;
    this.content = '';
  }
}
