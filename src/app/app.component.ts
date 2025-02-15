import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';

import { ColorSchemeService } from './core/services/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mobileQuery: MediaQueryList;

  constructor(
    private colorSchemeService: ColorSchemeService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    this.colorSchemeService.load();
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change',this.mobileQueryListener)
  }

  mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change',this.mobileQueryListener)
  }

}
