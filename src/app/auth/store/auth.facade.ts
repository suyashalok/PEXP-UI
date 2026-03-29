import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { OktaAuthService } from '../services/okta-auth.service';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  readonly isAuthenticated$ = this.authStore.isAuthenticated$;

  constructor(
    private readonly authStore: AuthStore,
    private readonly oktaAuthService: OktaAuthService,
    private readonly router: Router
  ) {}

  beginLogin(): void {
    this.oktaAuthService.loginRedirect();
  }

  handleCallback(code: string) {
    return this.oktaAuthService.exchangeCodeForSession(code).pipe(
      tap((session) => {
        this.authStore.setSession({ accessToken: session.accessToken, userEmail: 'user@pbm.com' });
        localStorage.setItem('pbm_auth', JSON.stringify(session));
        void this.router.navigate(['/dashboard']);
      })
    );
  }

  hydrateFromStorage(): void {
    const raw = localStorage.getItem('pbm_auth');
    if (!raw) {
      return;
    }

    const parsed: { accessToken: string } = JSON.parse(raw);
    this.authStore.setSession({ accessToken: parsed.accessToken, userEmail: 'user@pbm.com' });
  }

  logout(): void {
    this.oktaAuthService.logout();
    this.authStore.clearSession();
    void this.router.navigate(['/landing']);
  }

  getAccessToken(): string | null {
    return this.authStore.getAccessTokenSnapshot();
  }
}
