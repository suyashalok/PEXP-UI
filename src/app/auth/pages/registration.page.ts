import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>New Pharmacy Registration</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Start onboarding to create a pharmacy profile and begin the Cred Pack credentialing workflow.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <a mat-flat-button color="primary" routerLink="/credentialing">Start Cred Pack</a>
        <a mat-button routerLink="/landing">Already registered? Sign in</a>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPage {}
