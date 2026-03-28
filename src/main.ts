import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { APP_ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authTokenInterceptor } from './app/core/interceptors/auth-token.interceptor';
import { pharmacyContextInterceptor } from './app/core/interceptors/pharmacy-context.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([authTokenInterceptor, pharmacyContextInterceptor]))
  ]
}).catch((err: unknown) => console.error(err));
