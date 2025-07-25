import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { GifService } from '@/app/gifs/services';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  templateUrl: './side-menu-options.html',
  imports: [RouterLink, RouterLinkActive],
})
export class SideMenuOptions {
  gifService = inject(GifService);

  options: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'View trending GIFs',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      subLabel: 'Find your favorite GIFs',
    },
  ];
}
