import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-uploads-files',
  templateUrl: './uploads-files.component.html',
  styleUrls: ['./uploads-files.component.css']
})
export class UploadsFilesComponent {

  @Input() label: string = '';

  @Output() sendImageFiles: EventEmitter<File[]> = new EventEmitter();

  selectedFiles: File[] = [];

  constructor() { }


  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    //this.sendImageFiles.emit(this.selectedFiles)
  }

  uploadImagenesComprobante() {
    if (this.selectedFiles.length === 0) return;


    this.sendImageFiles.emit(this.selectedFiles)

    // this.productoService.postFotosComprobante(formData, this.data)
    // .subscribe( resp => {
    //   Swal.fire('Excelente', resp["message"], ( resp["ok"] ) ? 'success' : 'error')
    // });


    //this.selectedFiles = [];
  }

  clearSelectedFiles(): void {
    this.selectedFiles = [];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer?.files) {
      this.selectedFiles = Array.from(dataTransfer.files);
    }
  }
}
