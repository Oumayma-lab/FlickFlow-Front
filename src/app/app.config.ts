import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule),
    provideRouter(routes)
  ]
};
