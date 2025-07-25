import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard/dashboard.page'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending/trending.page'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search/search.page'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
