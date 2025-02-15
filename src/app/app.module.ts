import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { SchemeSelectorComponent } from './components/scheme-selector/scheme-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SchemeSelectorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
