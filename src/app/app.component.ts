import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthFacade } from './auth/store/auth.facade';

@Component({
  selector: 'pbm-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, AsyncPipe],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <span>PBM Pharmacy Experience Portal</span>
      <span class="spacer"></span>
      @if (authFacade.isAuthenticated$ | async) {
        <button mat-button routerLink="/dashboard">Dashboard</button>
        <button mat-button routerLink="/credentialing">Credentialing</button>
        <button mat-button (click)="logout()">Logout</button>
      }
    </mat-toolbar>

    <main class="content-shell">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .app-header {
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .spacer {
        flex: 1;
      }

      .content-shell {
        padding: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly authFacade = inject(AuthFacade);

  constructor() {
    this.authFacade.hydrateFromStorage();
  }

  protected logout(): void {
    this.authFacade.logout();
  }
}
