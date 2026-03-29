import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthFacade } from '../store/auth.facade';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Existing Pharmacy Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Returning pharmacies can sign in with Okta to resume credentialing.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-flat-button color="primary" (click)="loginWithOkta()">Login with Okta</button>
        <a mat-button routerLink="/registration">New pharmacy registration</a>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage implements OnInit {
  private readonly facade = inject(AuthFacade);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.facade.hydrateFromStorage();
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.facade.handleCallback(code).subscribe();
    }
  }

  protected loginWithOkta(): void {
    this.facade.beginLogin();
  }
}
