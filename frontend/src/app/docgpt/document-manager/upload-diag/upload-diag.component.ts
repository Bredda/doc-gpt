import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentService } from '../../services/documents.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-diag',
  templateUrl: './upload-diag.component.html',
  styleUrls: ['./upload-diag.component.scss'],
  providers: [MessageService]
})
export class UploadDiagComponent {
  @Input()
  visible = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  projectId = '';
  @Input()
  projectName = '';
  @Input()
  uploadedFiles: any[] = [];

  progress = 0;
  onProgress = false;

  constructor(
    private documentService: DocumentService,
    private messageService: MessageService
  ) {}

  onUploadConfirm() {
    this.onProgress = true;
    let nbFileDone = 0;
    this.progress = 1;
    for (const f of this.uploadedFiles) {
      this.documentService.uploadFile(this.projectId, f).subscribe({
        next: () => {
          console.log('upload done');
          nbFileDone = nbFileDone + 1;
          this.progress = Math.round(
            (nbFileDone / this.uploadedFiles.length) * 100
          );
          this.onProgress = this.progress !== 100;
          f.done = true;
        },
        error: () => {
          this.closeUploadDiag();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Erreur lors de l'upload de document`
          });
        }
      });
    }
  }

  closeUploadDiag() {
    this.visibleChange.emit(false);
    this.progress = 0;
    this.onProgress = false;
  }
}
