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
  constructor(
    private uiService: UiService,
    private docService: DocumentService,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.uiService.listenDocumentDisplay().subscribe((id: string) => {
      this.sidebarVisible = id !== '';

      const currentProjectId = this.contextService.currentProjectId;
      if (id !== '' && currentProjectId !== undefined) {
        this.docService
          .getUploadedDocContent(currentProjectId, id)
          .subscribe((c) => (this.content = c));
      }
    });
  }

  onHide() {
    this.sidebarVisible = false;
    this.content = '';
  }
}
