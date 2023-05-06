import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-document-uploader',
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.scss']
})
export class DocumentUploaderComponent {
  @Output()
  onDrop: EventEmitter<boolean> = new EventEmitter();
  @Output()
  droppedFiles: EventEmitter<any[]> = new EventEmitter();

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    const uploadedFiles = Array.from($event as ArrayLike<File>);
    uploadedFiles.map((f) => {
      return { ...f, done: false };
    });
    this.onDrop.emit(true);
    this.droppedFiles.emit(uploadedFiles);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    const files = Array.from(event.target.files as ArrayLike<File>);
  }
}
