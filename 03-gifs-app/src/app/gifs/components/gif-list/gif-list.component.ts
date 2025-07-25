import { Component, input, viewChild, ElementRef } from '@angular/core';
import { GifListItemComponent } from './gil-list-item';
import { Gif } from '../../interfaces';

@Component({
  selector: 'app-gif-list',
  templateUrl: './gif-list.component.html',
  imports: [GifListItemComponent],
})
export class GifListComponent {
  gifs = input<Gif[][]>([]);

  // Expose the scroll container reference
  scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');
}
