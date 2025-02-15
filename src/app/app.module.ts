import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MoviesComponent } from './pages/movies/components/movies/movies.component';
import { MovieCardComponent } from './pages/movies/components/movie-card/movie-card.component';
import { SchemeSelectorComponent } from './components/scheme-selector/scheme-selector.component';
import { ApiClientPrefixBuilderService } from './core/services/api-client-prefix-builder.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MoviesComponent,
    MovieCardComponent,
    SchemeSelectorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiClientPrefixBuilderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
