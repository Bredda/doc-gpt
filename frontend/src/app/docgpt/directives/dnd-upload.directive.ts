import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDndUpload]'
})
export class DndUploadDirective {
  @HostBinding('class.fileover')fileOver = false;
  @Output() fileDropped = new EventEmitter<any>();
  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true
    console.log('drag over')
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('drag leave')
  }
  @HostListener('drop', ['$event']) onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Drop')
    this.fileOver = false;
    console.log(evt)
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log(`You dropped ${files.length} files`)
      this.fileDropped.emit(files)
    }



  }
}
