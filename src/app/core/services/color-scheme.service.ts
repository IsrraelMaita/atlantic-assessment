import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ColorSchemeService {

    private renderer: Renderer2;
    private colorScheme = '';
    private colorSchemePrefix = 'color-scheme-';
    colorSchemaChanged$ = new Subject<void>();

    constructor(rendererFactory: RendererFactory2) {
      this.renderer = rendererFactory.createRenderer(null, null);
    }

    getPreferedColorScheme(): string {
      if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        this.colorScheme = 'dark';
      }
      return this.colorScheme;
    }

    setColorScheme(scheme: string): void {
      this.colorScheme = scheme;
      localStorage.setItem('prefers-color', scheme);
    }

    getColorScheme(): string {
      const localStorageColorScheme = localStorage.getItem('prefers-color');
      if (localStorageColorScheme) {
        this.colorScheme = localStorageColorScheme;
      } else {
        this.getPreferedColorScheme();
      }

      return this.colorScheme;
    }

    load(): void {
      this.getColorScheme();
      this.renderer.addClass(document.body, this.colorSchemePrefix + this.colorScheme);
    }

    update(scheme: string): void {
      this.setColorScheme(scheme);
      this.renderer.removeClass(document.body, this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light' : 'dark'));
      this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
      this.colorSchemaChanged$.next();
    }

    currentActive(): string {
      return this.colorScheme;
    }

    isDarkTheme(): boolean {
      if (this.colorScheme === 'dark') {
        return true;
      }
      return false;
    }

    colorSchemaChangeListener(): Observable<void> {
      return this.colorSchemaChanged$.asObservable();
    }

}