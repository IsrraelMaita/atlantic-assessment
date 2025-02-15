import { Component } from '@angular/core';

import { ColorSchemeService } from 'src/app/core/services/color-scheme.service';

@Component({
  selector: 'app-scheme-selector',
  templateUrl: './scheme-selector.component.html',
  styleUrls: ['./scheme-selector.component.scss']
})
export class SchemeSelectorComponent {

  isDarkModeActive = false;

  constructor(private colorSchemeService: ColorSchemeService) {
    this.isDarkModeActive = this.colorSchemeService.isDarkTheme();
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
