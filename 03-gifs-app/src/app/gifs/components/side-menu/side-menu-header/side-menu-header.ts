import { Component } from '@angular/core';
import { environment } from '@envs/environment';

@Component({
  selector: 'gifs-side-menu-header',
  templateUrl: './side-menu-header.html',
})
export class SideMenuHeader {
  envs = environment;
}
