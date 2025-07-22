import { Routes } from '@angular/router';
import { CounterPage, Dragonball, DragonballSuper, HeroPage } from './pages';

export const routes: Routes = [
  {
    path: '',
    component: CounterPage,
  },
  {
    path: 'hero',
    component: HeroPage,
  },
  {
    path: 'dragonball',
    component: Dragonball,
  },
  {
    path: 'dragonball-super',
    component: DragonballSuper,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
