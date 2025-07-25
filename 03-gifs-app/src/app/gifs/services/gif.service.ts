import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { environment } from '@envs/environment';
import { map, Observable, tap } from 'rxjs';
import type { Gif, GiphyResponse } from '../interfaces';
import { GifMapper } from '../mapper';

const LIMIT = 24; // Giphy API limit

const loadHistory = (): Record<string, Gif[]> => {
  const history = localStorage.getItem('history');
  if (!history) return {};
  try {
    return JSON.parse(history);
  } catch (error) {
    console.error('Error parsing history from localStorage:', error);
    return {};
  }
};

@Injectable({ providedIn: 'root' })
export class GifService {
  envs = environment;

  private readonly http = inject(HttpClient);

  history = signal<Record<string, Gif[]>>(loadHistory());
  historyKeys = computed(() => Object.keys(this.history()));

  saveHistory = effect(() =>
    localStorage.setItem('history', JSON.stringify(this.history()))
  );

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${this.envs.giphyApiUrl}/trending`, {
        params: {
          api_key: this.envs.giphyApiKey,
          limit: LIMIT,
        },
      })
      .pipe(
        map(({ data }) => data),
        map(GifMapper.fromGiphyResponseArray)
      );
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${this.envs.giphyApiUrl}/search`, {
        params: {
          api_key: this.envs.giphyApiKey,
          limit: LIMIT,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map(GifMapper.fromGiphyResponseArray),
        tap((gifs) => {
          this.history.update((prev) => ({
            ...prev,
            [query.trim().toLowerCase()]: gifs,
          }));
        })
      );
  }

  searchHistory(query: string): Gif[] {
    return this.history()[query.trim().toLowerCase()] || [];
  }

  groupGifs({ gifs, size = 3 }: { gifs: Gif[]; size?: number }): Gif[][] {
    return Array.from({ length: Math.ceil(gifs.length / size) }, (_, i) =>
      gifs.slice(i * size, i * size + size)
    );
  }
}
