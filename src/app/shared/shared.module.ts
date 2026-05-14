import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404pageComponent } from './pages/error404page/error404page.component';
import { UploadsFilesComponent } from './components/uploads-files/uploads-files.component';
import { MatButtonModule } from '@angular/material/button';
import { WatchCarouselImageComponent } from './components/watch-carousel-image/watch-carousel-image.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    Error404pageComponent,
    UploadsFilesComponent,
    WatchCarouselImageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    UploadsFilesComponent,
    WatchCarouselImageComponent
  ]
})
export class SharedModule { }
