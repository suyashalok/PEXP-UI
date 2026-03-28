import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthFacade } from '../store/auth.facade';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>PBM Portal Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Authenticate using your Okta account to continue onboarding workflows.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-flat-button color="primary" (click)="login()">Login with Okta</button>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthShellPage implements OnInit {
  private readonly facade = inject(AuthFacade);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.facade.hydrateFromStorage();
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.facade.handleCallback(code).subscribe();
    }
  }

  protected login(): void {
    this.facade.beginLogin();
  }
}
