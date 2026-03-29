import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'landing',
    loadComponent: () => import('./auth/pages/landing.page').then((m) => m.LandingPage)
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./auth/pages/registration.page').then((m) => m.RegistrationPage)
  },
  {
    path: 'auth',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/pages/dashboard.page').then((m) => m.DashboardPage)
      },
      {
        path: 'credentialing',
        loadComponent: () =>
          import('./credentialing/pages/credentialing-shell.page').then(
            (m) => m.CredentialingShellPage
          )
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'landing' }
];
