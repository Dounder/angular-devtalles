import { Component } from '@angular/core';
import { SideMenuHeader } from './side-menu-header';
import { SideMenuOptions } from './side-menu-options';

@Component({
  selector: 'gifs-side-menu',
  templateUrl: './side-menu.html',
  imports: [SideMenuHeader, SideMenuOptions],
})
export class SideMenu {}
