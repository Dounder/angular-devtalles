import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: new Date().getTime(),
      name: this.name(),
      power: this.power(),
    };

    this.newCharacter.emit(newCharacter);
    this.reset();
  }

  reset() {
    this.name.set('');
    this.power.set(0);
  }
}
