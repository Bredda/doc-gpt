import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[appDndUpload]'
})
export class DndUploadDirective {
  @HostBinding('class.fileover') fileOver = false;
  @Output() fileDropped = new EventEmitter<any>();
  constructor() {
    //EMPTY
  }

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }
  @HostListener('drop', ['$event']) onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
      console.log(files);
    }
  }
}
