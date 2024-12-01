import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { exceptionInterceptor } from './exception.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule), // Import HttpClientModule
    {
      provide: HTTP_INTERCEPTORS,
      useClass: exceptionInterceptor,
      multi: true,
    },
    provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(),
  provideAnimations()]
};
