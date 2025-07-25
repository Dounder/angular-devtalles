import { Gif } from '../../../interfaces';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  templateUrl: './gif-list-item.html',
})
export class GifListItemComponent {
  gif = input.required<Gif>();
}
