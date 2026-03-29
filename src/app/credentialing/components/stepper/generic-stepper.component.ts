import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CredentialingStepConfig } from '../../models/credentialing.models';

@Component({
  selector: 'pbm-generic-stepper',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ activeStep?.title }}</mat-card-title>
        <mat-card-subtitle>{{ activeStep?.description }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>

      <mat-card-actions class="step-actions">
        <button mat-button (click)="previous.emit()" [disabled]="activeIndex === 0">Back</button>
        <button mat-stroked-button (click)="save.emit()">Save & Resume</button>
        <button mat-flat-button color="primary" (click)="next.emit()">
          {{ isLast ? 'Submit' : 'Continue' }}
        </button>
      </mat-card-actions>

      <footer class="step-footer">
        <span class="step-count">Step {{ activeIndex + 1 }} of {{ totalSteps }}</span>
        <span *ngFor="let step of steps; let i = index" [class.active]="i === activeIndex">
          {{ i + 1 }}. {{ step.title }}
        </span>
      </footer>
    </mat-card>
  `,
  styles: [
    `
      .step-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
      }

      .step-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        border-top: 1px solid #e2e8f0;
        padding-top: 0.75rem;
      }

      .step-count {
        font-weight: 700;
        margin-right: 0.5rem;
      }

      .active {
        font-weight: 700;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericStepperComponent {
  @Input({ required: true }) steps: CredentialingStepConfig[] = [];
  @Input({ required: true }) activeIndex = 0;
  @Input() totalSteps = 45;
  @Output() readonly next = new EventEmitter<void>();
  @Output() readonly previous = new EventEmitter<void>();
  @Output() readonly save = new EventEmitter<void>();

  get activeStep(): CredentialingStepConfig | undefined {
    return this.steps[this.activeIndex];
  }

  get isLast(): boolean {
    return this.activeIndex === this.steps.length - 1;
  }
}
