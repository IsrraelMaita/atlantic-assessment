import { Component } from '@angular/core';
import { NAVIGATION_ITEMS } from 'src/app/resources/navigation-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  navigationItems = NAVIGATION_ITEMS;

  constructor() { }
}
