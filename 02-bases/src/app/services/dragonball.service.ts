import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
};

@Injectable({ providedIn: 'root' })
export class DragonballService {
  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(newCharacter: Character) {
    if (!newCharacter.name || !newCharacter.power || newCharacter.power <= 0) {
      return;
    }

    this.characters.update((chars) => [...chars, newCharacter]);
  }
}
