import { Component, EventEmitter, Input, Output } from '@angular/core';
import { carouselImage } from '../../utils/carousel_image.interface';

@Component({
  selector: 'shared-carousel',
  templateUrl: './watch-carousel-image.component.html',
  styleUrls: ['./watch-carousel-image.component.css']
})
export class WatchCarouselImageComponent {
  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Output() receiveImageId: EventEmitter<number> = new EventEmitter();

  selectedIndex = 0;
  matMenuTimer: any;

  ngOnInit(): void {
  }

  // cambia de imagen
  selectedImagen(i: number) {
    this.selectedIndex = i;
  }

  // llama a goingToImagen() y crea un delay para darle chance al
  // double click
  click(path: string): void {
    this.matMenuTimer = setTimeout(() => { this.goingToImagen(path); }, 300);
  }

  // llama a receiveIdImage() y limpia el delay
  DoubleClick(imagenId: number): void {
    clearTimeout(this.matMenuTimer);
    this.matMenuTimer = undefined;
    this.receiveIdImage(imagenId);
  }

  // Para llevar al usuario a otra pestaña con la imagen
  goingToImagen(path: string) {
    if (!this.matMenuTimer) return;
    window.open(path, '_blank');
  }

  // Para enviar el id de la imagen al padre
  receiveIdImage(imagenId: number): void {
    this.receiveImageId.emit(imagenId)
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
