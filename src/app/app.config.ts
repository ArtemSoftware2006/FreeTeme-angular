import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptorService } from './services/interceptors/authorization-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
        provide: HTTP_INTERCEPTORS,
        multi: true,
        useExisting: AuthorizationInterceptorService
    }, provideAnimations()]
};
