import { Component, inject } from '@angular/core';
import {
  CharacterAddComponent,
  CharacterListComponent,
} from '../../components';
import { DragonballService } from '../../services';

@Component({
  templateUrl: './dragonball-super.page.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuper {
  public readonly dragonballService = inject(DragonballService);
}
