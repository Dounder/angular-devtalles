import { Component, inject, signal } from '@angular/core';

import { GifListComponent } from '../../components';
import { GifService } from '../../services';
import { Gif } from '../..';

@Component({
  templateUrl: './trending.page.html',
  imports: [GifListComponent],
})
export default class TrendingComponent {
  gifService = inject(GifService);

  gifs = signal<Gif[][]>([]);
  isLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
  }

  private loadTrendingGifs() {
    this.gifService.loadTrendingGifs().subscribe({
      next: (gifs) => {
        this.gifs.set(this.gifService.groupGifs({ gifs, size: 3 }));
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onScroll() {}
}
