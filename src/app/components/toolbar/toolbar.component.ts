import { Component } from '@angular/core';

import { ColorSchemeService } from 'src/app/services/color-scheme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  isDarkModeActive = false;

  constructor(private colorSchemeService: ColorSchemeService) {
    if (this.colorSchemeService.getColorScheme() === 'dark') {
      this.isDarkModeActive = true;
    }
  }

  updateTheme(): void {
    if (this.isDarkModeActive) {
      this.colorSchemeService.update('light');
      this.isDarkModeActive = false;
      return;
    }
    this.colorSchemeService.update('dark');
    this.isDarkModeActive = true;
  }
}
