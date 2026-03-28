import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface OktaSession {
  accessToken: string;
  idToken: string;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class OktaAuthService {
  loginRedirect(): void {
    // Placeholder for @okta/okta-angular sign-in redirect.
    window.location.href = '/auth/callback?code=placeholder';
  }

  exchangeCodeForSession(_code: string): Observable<OktaSession> {
    return of({
      accessToken: 'mock-access-token',
      idToken: 'mock-id-token',
      expiresAt: Date.now() + 3600000
    });
  }

  logout(): void {
    localStorage.removeItem('pbm_auth');
  }
}
