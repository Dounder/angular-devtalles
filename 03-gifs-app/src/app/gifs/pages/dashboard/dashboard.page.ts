import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from '../../components/';

@Component({
  imports: [RouterOutlet, SideMenu],
  templateUrl: './dashboard.page.html',
})
export default class DashboardPage {}
