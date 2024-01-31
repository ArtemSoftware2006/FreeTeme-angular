import { ApplicationConfig, EnvironmentProviders, Provider, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptorService } from './services/interceptors/authorization-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { CustomCurrencyPipe } from './services/pipes/custom-currency';
import { ToastrModule } from 'ngx-toastr';

const toastrProviders = ToastrModule.forRoot().providers;

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
        provide: HTTP_INTERCEPTORS,
        multi: true,
        useExisting: AuthorizationInterceptorService
    }, provideAnimations(),
    DatePipe,
    CustomCurrencyPipe,
    ...toastrProviders as (Provider | EnvironmentProviders)[]
  ]
};
