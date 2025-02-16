import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ActorsComponent } from './pages/actors/components/actors/actors.component';
import { MoviesComponent } from './pages/movies/components/movies/movies.component';
import { MovieCardComponent } from './pages/movies/components/movie-card/movie-card.component';
import { SchemeSelectorComponent } from './components/scheme-selector/scheme-selector.component';
import { ApiClientPrefixBuilderService } from './core/services/api-client-prefix-builder.service';
import { ActorsChartsComponent } from './pages/actors/components/actors-charts/actors-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ActorsComponent,
    MoviesComponent,
    MovieCardComponent,
    SchemeSelectorComponent,
    ActorsChartsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
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
