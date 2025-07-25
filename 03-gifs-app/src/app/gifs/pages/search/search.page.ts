import {
  Component,
  effect,
  inject,
  signal,
  viewChild,
  AfterViewInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Gif } from '../..';
import { GifListComponent } from '../../components';
import { GifService } from '../../services';

@Component({
  templateUrl: './search.page.html',
  imports: [GifListComponent],
})
export default class SearchComponent {
  private route = inject(ActivatedRoute);
  gifService = inject(GifService);
  gifs = signal<Gif[][]>([]);
  isLoading = signal<boolean>(false);

  // Get query parameter from route
  queryParam = toSignal<string | undefined>(
    inject(ActivatedRoute).queryParams.pipe(
      map(
        (params) => (params['q'] as string)?.trim().toLowerCase() || undefined
      )
    )
  );

  constructor() {
    // React to query parameter changes (when clicking different history items)
    effect(() => {
      const currentQuery = this.queryParam();

      if (!currentQuery) {
        this.gifs.set([]);
        return;
      }

      const cachedGifs = this.gifService.searchHistory(currentQuery);

      this.gifs.set(this.gifService.groupGifs({ gifs: cachedGifs })); // Group gifs by query
    });
  }

  onSearch(query: string) {
    if (query && query.trim().length <= 0) return;

    // Check if we already have results for this query in history
    const cachedGifs = this.gifService.searchHistory(query);

    if (cachedGifs.length > 0) {
      // Use cached results if available
      this.gifs.set(this.gifService.groupGifs({ gifs: cachedGifs }));
      return;
    }

    // If no cached results, make API call
    this.isLoading.set(true);
    this.gifService.searchGifs(query).subscribe((res) => {
      this.isLoading.set(false);
      this.gifs.set(this.gifService.groupGifs({ gifs: res }));
    });
  }
}
