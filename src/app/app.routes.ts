import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/pages/auth-shell.page').then((m) => m.AuthShellPage)
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
  { path: '**', redirectTo: '' }
];
