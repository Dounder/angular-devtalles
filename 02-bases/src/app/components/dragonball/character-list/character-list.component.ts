import { Component, input } from '@angular/core';
import type { Character } from '../../../interfaces';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  characters = input.required<Character[]>();
  listName = input<string>('Character List');
}
